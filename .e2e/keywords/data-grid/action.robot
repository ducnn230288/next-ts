*** Settings ***
Resource               ../utils/check.robot

*** Keywords ***

Right click "${name}" column
  ${name}=                      Check Text                                                ${name}
  ${element}=                   Get Element Header By Name                                ${name}
  Scroll To Element             ${element}
  Click                         ${element}    right
  Wait For Load State           domcontentloaded                                          timeout=${BROWSER_TIMEOUT}

Drag to resize "${name}" column
  ${element}=                   Get Element Header By Name                                ${name}                   //button[contains(@class, "resizer")]
  Scroll To Element             ${element}
  Drag And Drop Relative To     ${element}    100    0

Get Element Header By Name
  [Arguments]                   ${name}                                                   ${xpath}=${EMPTY}
  RETURN                        ${CURRENT_SECTION}//thead//th[@aria-label = "${name}"][1]${xpath}
