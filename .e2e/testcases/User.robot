*** Settings ***
Resource               ../keywords/all/User.robot
Test Setup             Setup
Test Teardown          Tear Down

*** Test Cases ***

US_00 User
  [Tags]                                                                                                Develop                   UI                     Smoketest
  All steps User
