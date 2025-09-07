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
  ${condition}=             Browser.Get Text                          ${element}
  Scroll To Element         ${element}
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
    Set Global Variable     \${STATE["${name}"]}              ${text}
  END

Enter "${type}" in textarea "${name}" with "${text}"
  Wait Until Element Spin
  ${text}=                  Get Random Text                   ${type}                       ${text}
  ${element}=               Get Element Item By Name          ${name}                       //textarea
  Clear Text                ${element}
  Fill Text                 ${element}                        ${text}
  ${condition}=             Browser.Get Text                          ${element}
  Scroll To Element         ${element}
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
  Set Global Variable       \${STATE["${name}"]}              ${text}
  END

Click radio "${name}" with "${text}"
  ${element}=               Get Element Item By Name          ${name}                       //label[@class="choice"]/span[text()="${text}"]
  Click                     ${element}
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
    Set Global Variable     \${STATE["${name}"]}              ${text}
  END

Click checkbox "${name}" with "${text}"
  ${element}=               Get Element Item By Name          ${name}                       //label[@class="choice"]/span[text()="${text}"]
  Click                     ${element}
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
    Set Global Variable     \${STATE["${name}"]}              ${text}
  END

Click date picker in "${name}" with "${text}"
  IF  "${text}" == "today"
    ${text}=                Get Current Date                  local                         result_format=%Y/%m/%d
  ELSE IF  "${text}" == "yesterday"
    ${text}=                Get Current Date                  local                         -1 day                                     result_format=%Y/%m/%d
  ELSE
    ${text}=                Get Random Text                   date                          ${text}
  END
  ${element}=               Get Element Item By Name          ${name}                       //div[contains(@class,"entry-date")]/*[1]//input
  Fill Text                 ${element}                        ${text}                       True
  Click                     ${element}
  Click                     //div[contains(@class,"calendar")]//button[@title = "${text}"]
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
  Set Global Variable       ${STATE["${name}"]}               ${text}
  END

Click date range picker in "${name}" from "${from}" to "${to}"
  IF  "${from}" == "today"
    ${from}=                Get Current Date                  local                         result_format=%Y/%m/%d
  ELSE IF  "${from}" == "yesterday"
    ${from}=                Get Current Date                  local                         -1 day                                     result_format=%Y/%m/%d
  ELSE
    ${from}=                Get Random Text                   date                          ${from}
  END
  ${element}=               Get Element Item By Name          ${name}                       //div[contains(@class,"entry-date")]/*[1]//input
  Fill Text                 ${element}                        ${from}                       True
  Click                     ${element}
  Click                     //div[contains(@class,"calendar")]//button[@title = "${from}"]
  
  IF  "${to}" == "today"
    ${to}=                  Get Current Date                    local                         result_format=%Y/%m/%d
  ELSE IF  "${to}" == "yesterday"
    ${to}=                  Get Current Date                    local                         -1 day                                     result_format=%Y/%m/%d
  ELSE
    ${to}=                  Get Random Text                     date                          ${to}
  END
  ${element}=               Get Element Item By Name          ${name}                       //div[contains(@class,"entry-date")]/*[last()]//input
  Fill Text                 ${element}                        ${to}                         True

  ${cnt}=                   Get Length                        ${to}
  IF  ${cnt} > 0
  Set Global Variable       ${STATE["${name} From"]}          ${from}
  Set Global Variable       ${STATE["${name} To"]}            ${to}
  END

Click select "${name}" with "${text}"
  ${text}=                  Get Random Text                   Text                          ${text}
  ${element}=               Get Element Item By Name          ${name}                       //*[contains(@class, "entry-select")]
  Hover                     ${element}
  Hover                     ${element}
  Click                     ${element}
  Click                     //*[@aria-label="${name}"]//button[contains(text(),'${text}')]
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
    Set Global Variable     ${STATE["${name}"]}              ${text}
  END

Upload file in "${name}" with "${text}"
  ${element}=               Get Element Item By Name          ${name}                       //input[@type = "file"]
  Upload File By Selector   ${element}                        .e2e/upload/${text}
  Wait For Load State       domcontentloaded                  timeout=${BROWSER_TIMEOUT}
  Wait Until Element Spin
