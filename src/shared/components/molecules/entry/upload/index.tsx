'use client';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { serviceFetch, serviceMessage } from '@/core/services';
import { KEY_TOKEN } from '@/shared/constants';
import { EIcon, ESize } from '@/shared/enums';
import type { TFile } from '@/shared/types';
import { arrayMove } from '@/shared/utils';
import Button from '../../../atoms/button';
import Icon from '../../../atoms/icon';
import Image from '../../../atoms/image';
import Spin from '../../../atoms/spin';
import './style.scss';
import type Props from './type';

const EntryUpload = ({
  value = [],
  handleChange,
  showBtnDelete = () => true,
  method = 'post',
  maxSize = 40,
  isMultiple,
  api = '/files',
  accept = 'image/*',
  isShowFile = false,
  validation = async () => true,
}: Props) => {
  const t = useTranslations('Components');

  const [stateEntryUpload, setStateEntryUpload] = useState<{
    listFiles: (TFile | string)[];
    isLoading: boolean;
  }>({
    listFiles: [],
    isLoading: false,
  });

  useEffect(() => {
    let listFiles: (TFile | string)[] = typeof value === 'string' ? [value] : [];
    if (value && typeof value === 'object') {
      listFiles = value;
    }

    if (
      JSON.stringify(stateEntryUpload.listFiles) !== JSON.stringify(listFiles) &&
      stateEntryUpload.listFiles.filter(
        item => typeof item === 'object' && item.status === 'uploading',
      ).length === 0
    ) {
      setStateEntryUpload({ listFiles, isLoading: false });
    }
  }, [value, isMultiple]);

  const fnGetData = (file: TFile | string, key: keyof TFile) =>
    (typeof file === 'object' ? file[key] : file) as string;

  const refInput = useRef<HTMLInputElement>(null);
  const refListFiles = useRef<(TFile | string)[]>([]);
  const fnUpload = async (files: FileList | null) => {
    if (files) {
      for (const file of files) {
        if (maxSize && file.size > maxSize * 1024 * 1024) {
          serviceMessage.error({
            title: 'Error',
            content: `${file.name} (${(file.size / (1024 * 1024)).toFixed(1)}mb): ${t(
              'YouCanOnlyUploadUpToMB',
              { max: maxSize },
            )}`,
          });
        }

        if (
          (maxSize && file.size > maxSize * 1024 * 1024) ||
          !(await validation(file, stateEntryUpload.listFiles))
        ) {
          return setStateEntryUpload({
            isLoading: false,
            listFiles: stateEntryUpload.listFiles.filter(
              _item => typeof _item === 'object' && _item.id !== dataFile.id,
            ),
          });
        }
        /**
         * Retrieves the base64 representation of the given file.
         */
        const thumbUrl = await fnGetBase64(file);
        /**
         * Represents a file data object.
         */
        const dataFile = { name: file.name, path: thumbUrl, id: uuidv4(), status: 'uploading' };
        refListFiles.current = !isMultiple ? [dataFile] : [...refListFiles.current, dataFile];
        setStateEntryUpload({ isLoading: true, listFiles: refListFiles.current });

        await fnFormatData({ file, dataFile });
      }
    }

    if (refInput.current) refInput.current.value = '';
  };

  const fnPaste = async (event: React.ClipboardEvent) => {
    /**
     * Retrieves the items from the clipboard data.
     */
    const items = event.clipboardData.items;
    for (const index in items) {
      const item = items[index];
      if (item.kind === 'file') {
        const blob = item.getAsFile();
        const dataTransfer = new DataTransfer();
        if (blob) dataTransfer.items.add(blob);
        await fnUpload(dataTransfer.files);
      }
    }
  };

  const fnMoveImage = async (index: number, new_index: number) => {
    if (isMultiple) {
      const listFiles = arrayMove<TFile | string>(stateEntryUpload.listFiles, index, new_index);
      setStateEntryUpload({ listFiles, isLoading: false });
      handleChange?.(listFiles);
    }
  };

  const fnClickUpload = () => refInput.current!.click();

  const fnConfirmDelete = (file: TFile | string) =>
    serviceMessage.confirm({
      content: t('AreYouSureWantDelete', {
        name: typeof file === 'object' ? file.name : file,
        label: t('File').toLowerCase(),
      }),
      onOk: () => handleChange?.(stateEntryUpload.listFiles.filter(_item => _item !== file)),
    });
  const classBtnDelete = (index: number) =>
    classNames('btn-delete', {
      'top-16':
        stateEntryUpload.listFiles.length > 1 &&
        index > 0 &&
        index < stateEntryUpload.listFiles.length - 1,
      'top-8':
        stateEntryUpload.listFiles.length > 1 &&
        (index === 0 || index === stateEntryUpload.listFiles.length - 1),
      'top-1': stateEntryUpload.listFiles.length === 1,
    });

  const fnFormatData = async ({ file, dataFile }: { file: File; dataFile: TFile }) => {
    /**
     * FormData object used for sending data in HTTP requests.
     */
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    let data;
    try {
      data = (
        await serviceFetch.responsible<TFile>({
          url: api,
          config: {
            ...serviceFetch.init(),
            method,
            body: bodyFormData,
            headers: {
              authorization: 'Bearer ' + (localStorage.getItem(KEY_TOKEN) ?? ''),
              'Accept-Language': localStorage.getItem('i18nextLng') ?? '',
            },
          },
        })
      ).data;
    } catch (e) {
      console.error(e);
    }

    if (data) {
      /**
       * Updates the files array based on the given data and file ID.
       * If isMultiple is true, it updates the corresponding file in the listFiles array.
       * If isMultiple is false, it replaces the files array with a new array containing the given data.
       */
      refListFiles.current = isMultiple
        ? refListFiles.current.map(item => {
            if (typeof item === 'object' && item.id === dataFile.id) {
              return { ...item, ...data, status: 'done' };
            }
            return item;
          })
        : [{ ...data, status: 'done' }];
      setStateEntryUpload({ isLoading: false, listFiles: refListFiles.current });
      handleChange?.(refListFiles.current);
    } else {
      setStateEntryUpload({
        isLoading: false,
        listFiles: stateEntryUpload.listFiles.filter(
          _item => typeof _item === 'object' && _item.id !== dataFile.id,
        ),
      });
    }
  };

  const fnGetBase64 = async (file: File): Promise<string> =>
    !isShowFile
      ? await new Promise(resolve => {
          const fileReader = new FileReader();
          fileReader.onload = () => resolve(fileReader.result as string);
          fileReader.readAsDataURL(file);
        })
      : '';

  return (
    <Spin isLoading={stateEntryUpload.isLoading} className="entry-upload">
      <input
        type="file"
        className={'hidden'}
        accept={accept}
        multiple={isMultiple}
        ref={refInput}
        onChange={e => fnUpload(e.currentTarget.files)}
      />
      <div className={classNames({ list: isMultiple })}>
        {stateEntryUpload.listFiles.map((file, index: number) => (
          <div key={'file-' + index} className={'float-buttons'}>
            {!isShowFile ? (
              <Image
                className="size-full"
                src={fnGetData(file, 'path')}
                alt={fnGetData(file, 'name')}
              />
            ) : (
              <span>{fnGetData(file, 'path')}</span>
            )}
            {index > 0 && (
              <button
                className={'btn-move top-1'}
                onClick={() => fnMoveImage(index, index - 1)}
                type="button">
                <Icon className={'rotate-180'} name={EIcon.Arrow} />
              </button>
            )}

            {index < stateEntryUpload.listFiles.length - 1 && (
              <button
                type="button"
                onClick={() => fnMoveImage(index, index + 1)}
                className={classNames('btn-move', { 'top-8': index > 0, 'top-1': index === 0 })}>
                <Icon name={EIcon.Arrow} />
              </button>
            )}
            {showBtnDelete(file) && (
              <button
                type="button"
                onClick={() => fnConfirmDelete(file)}
                className={classBtnDelete(index)}>
                <Icon name={EIcon.Close} />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className={'footer-buttons'}>
        <Button
          size={ESize.Small}
          handleClick={fnClickUpload}
          icon={EIcon.Upload}
          text={'Upload'}
        />
        <Button size={ESize.Small} icon={EIcon.Paste} text={'Paste'} handlePaste={fnPaste} />
      </div>
    </Spin>
  );
};

export default EntryUpload;
