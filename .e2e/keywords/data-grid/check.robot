*** Settings ***
Resource               ../common.robot
Resource               ./action.robot

*** Keywords ***

Check data grid column "${name}"
  Then Webpage should contain "${name}" column with sort and search function
  Then Check the "${name}" column pinning
  Then Check the "${name}" column hiding
  Then Check the "${name}" column resizing

Check the "${name}" column pinning
  When Right click "${name}" column
  When Click the "Pin left" drop-down menu
  Then Webpage should contain "${name}" column on the left

  When Right click "${name}" column
  When Click the "Pin right" drop-down menu
  Then Webpage should contain "${name}" column on the right

  When Right click "${name}" column
  When Click the "Reset pin" drop-down menu

Check the "${name}" column hiding
  When Right click "${name}" column
  When Click the "Hide" drop-down menu
  Then Webpage should not contain "${name}" column

  When Click "Hide column" button
  Then Webpage should contain "${name}" column

Webpage should contain "${name}" column with sort and search function
  Wait Until Element Spin
  ${element}=                 Get Element Header By Name                                ${name}                   [contains(@class,"has-sorter")]
  ${count}=                   Get Element Count                   ${element}
  Should Be True              ${count} > 0
  ${count}=                   Get Element Count                   ${element}
  Should Be True              ${count} > 0

Webpage should contain "${name}" column on the ${location}
  ${count}=                   Get Element Count    ${CURRENT_SECTION}//thead//th
  ${value} =                  Set Variable    ${name}
  IF    '${location}' == 'left'
    ${count}=                 Set Variable    1
  END
  Get Attribute              ${CURRENT_SECTION}//thead//th[${count}]      aria-label     equal     ${name}

Webpage should contain the list data from database
  Wait Until Element Spin
  ${count}=                   Get Element Count                   //table[contains(@class,"c-virtual-scroll")]
  Should Be True              ${count} >= 1

Webpage should not contain "${name}" column
  ${element}=                 Get Element Header By Name                                ${name}
  Wait For Elements State    ${element}   hidden    ${BROWSER_TIMEOUT}

Webpage should contain "${name}" column
  ${element}=                 Get Element Header By Name                                ${name}
  Wait For Elements State    ${element}   attached    ${BROWSER_TIMEOUT}

Check the "${name}" column resizing
  ${element}=                 Get Element Header By Name                                ${name}
  ${width_old}=    Get Style    ${element}    width
  When Drag to resize "${name}" column
  ${width_new}=    Get Style    ${element}    width
  Then Should Not Be Equal         ${width_old}    ${width_new}

  When Right click "${name}" column
  When Click the "Reset size" drop-down menu
  ${width_reset}=             Get Style    ${element}    width
  Should Be Equal             ${width_old}    ${width_reset}
