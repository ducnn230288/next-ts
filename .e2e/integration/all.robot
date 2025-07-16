*** Settings ***
Resource               ../keywords/all/Login.robot
Test Setup             Setup
Test Teardown          Tear Down

*** Test Cases ***

All steps in website
  when All steps Login
