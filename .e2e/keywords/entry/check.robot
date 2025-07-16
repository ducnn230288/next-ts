*** Settings ***
Resource               ../common.robot
Resource               ./action.robot

*** Keywords ***

Webpage should contain "${name}" input field
  Wait Until Element Spin
  ${element}=               Get Element Item By Name          ${name}                       //*[(self::input or self::textarea) and contains(@class,"entry")]
  ${count}=                 Get Element Count                 ${element}
  Should Be True            ${count} >= 1

Required message "${text}" displayed under "${name}" field
  ${text}=                  Check Text                        ${text}
  ${element}=               Get Element Item By Name          ${name}                       //*[contains(@class, "feedback")]
  Element Text Should Be    ${element}                        ${text}

Data's information in "${name}" should be equal "${value}"
  Wait Until Element Spin
  ${value}=                 Check Text                         ${value}
  ${element}=               Get Element Item By Name           ${name}
  ${count}=                 Get Element Count                  ${element}
  IF  ${count} > 0
    ${element}=             Get Element Item By Name           ${name}                     //*[(self::input or self::textarea) and contains(@class,"entry") and (@value="${value}" or .="${value}")]
    Hover                   ${element}
    Get Text                ${element}                         equal                       ${value}
  END
