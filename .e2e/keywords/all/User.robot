*** Settings ***
Resource               ../utils/check.robot
Resource               ../entry/check.robot
Resource               ../data-grid/check.robot

*** Keywords ***

All steps User
  When In the "Sidebar" section
  When Click "Users" button

  When In the "Users" section
  Then Webpage should contain "Add User" button
  When Click "Add User" button

  When In the "Add User" section
  Then Heading should contain "Add User" inner text
  Then Webpage should contain "Email" input field
  Then Webpage should contain "Username" input field
  Then Webpage should contain "Password" input field
  Then Webpage should contain "Role" select field
  Then Webpage should contain "Fullname" input field
  Then Webpage should contain "Phone" input field
  Then Webpage should contain "Save" button
  Then Webpage should contain "Back to List" button

  When Click "Save" button
  Then Required message "Please enter email" displayed under "Email" field
  Then Required message "Please enter username" displayed under "Username" field
  Then Required message "Please enter password" displayed under "Password" field
  Then Required message "Please choose role" displayed under "Role" field
  Then Required message "Please enter fullname" displayed under "Fullname" field

  When Enter "email" in "Email" with "admin.admin.com"
  Then Required message "Please enter a valid email address!" displayed under "Email" field

  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "username" in "Username" with "_RANDOM_"
  When Enter "text" in "Password" with "Password1!"
  When Click select "Role" with "User"
  When Enter "text" in "Fullname" with "_RANDOM_"
  When Enter "phone" in "Phone" with "_RANDOM_"

  Then Data's information in "Email" should be equal "_@Email@_"
  Then Data's information in "Username" should be equal "_@Username@_"
  Then Data's information in "Password" should be equal "_@Password@_"
  Then Data's information in "Role" should be equal "_@Role@_"
  Then Data's information in "Fullname" should be equal "_@Fullname@_"
  Then Data's information in "Phone" should be equal "_@Phone@_"
  When Click "Save" button
  
  Then Look message "Successfully" in popup "Success"

  When In the "Users" section
  Then "_@Username@_" should be "visible" in the line
  Then Check data grid column "Username"
  Then Check data grid column "Email"
  Then Check data grid column "Fullname"
  Then Check data grid column "Phone"
  Then Check data grid column "Role"

  When Click on the "Edit" button in the "_@Username@_" line
  When In the "Edit User" section
  Then Webpage should contain "Email" input field
  Then Webpage should contain "Role" select field
  Then Webpage should contain "Fullname" input field
  Then Webpage should contain "Phone" input field

  When Enter "email" in "Email" with ""
  When Enter "text" in "Fullname" with ""
  When Click "Update" button
  Then Required message "Please enter email" displayed under "Email" field
  Then Required message "Please enter fullname" displayed under "Fullname" field

  When Enter "email" in "Email" with "_RANDOM_"
  When Click select "Role" with "Admin"
  When Enter "text" in "Fullname" with "_RANDOM_"

  Then Data's information in "Email" should be equal "_@Email@_"
  Then Data's information in "Role" should be equal "_@Role@_"
  Then Data's information in "Fullname" should be equal "_@Fullname@_"
  Then Data's information in "Phone" should be equal "_@Phone@_"
  When Click "Update" button
  Then Look message "Updated Successfully" in popup "Success"

  When In the "Users" section
  When Click on the "Delete" button in the "_@Username@_" line
  When In the "Warning" section
  When Click "Cancel" button

  When In the "Users" section
  Then "_@Username@_" should be "visible" in the line
  When Click on the "Delete" button in the "_@Username@_" line

  When In the "Warning" section
  When Click "Okay" button
  Then Look message "Deleted Successfully" in popup "Success"
  When In the "Users" section
  Then "_@Username@_" should be "hidden" in the line