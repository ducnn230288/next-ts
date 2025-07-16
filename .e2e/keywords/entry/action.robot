*** Settings ***
Resource               ../common.robot
Resource               ../utils/check.robot

*** Keywords ***

Enter "${type}" in "${name}" with "${text}"
  Wait Until Element Spin
  ${text}=                  Get Random Text                   ${type}                       ${text}
  ${element}=               Get Element Item By Name          ${name}                       //*[contains(@class, "entry")]
  Clear Text                ${element}
  Fill Text                 ${element}                        ${text}                       True
  ${condition}=             Get Text                          ${element}
  Scroll To Element         ${element}
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
    Set Global Variable     \${STATE["${name}"]}              ${text}
  END
