# Login Scenarios

1. Valid Login
   - Navigate to /
   - Fill username standard_user
   - Fill password secret_sauce
   - Click Login
   - Assert URL contains inventory.html

2. Locked Out User
   - Navigate to /
   - Fill username locked_out_user
   - Fill password secret_sauce
   - Click Login
   - Assert error text "Epic sadface: Sorry, this user has been locked out."

3. Invalid Credentials
   - Fill username wrong_user
   - Assert error text "Epic sadface: Username and password do not match any user in this service"
