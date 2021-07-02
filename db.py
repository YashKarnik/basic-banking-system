import names

q = ''
template = "INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('{}','{}','{}',10000);\n"
for i in range(20):
    fname = names.get_first_name()
    lname = names.get_last_name()
    email = fname.lower()+'.'+lname.lower()+'@email.com'
    temp = template.format(fname, lname, email)
    q += temp
print(q)
