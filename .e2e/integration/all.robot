*** Settings ***
Resource               ../keywords/all/Login.robot
Resource               ../keywords/all/Example.robot
Resource               ../keywords/all/User.robot
Test Setup             Setup
Test Teardown          Tear Down

*** Test Cases ***

All steps in website
  when All steps Login
  # when All steps Example
  when All steps User
