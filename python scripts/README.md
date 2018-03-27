The repair script requres the requests module. You can install this with:
```
python -m pip install requests
```
If you are reunning a linux distro that has seperate packages for different python versions (like fedora), also requires SU, you might need to use something like:
```
sudo python36 -m pip install requests
```

Once you have the requests module you can run the script by opeoning the directory and executing:
```
python repairServerData.py {TARGET_IP}
```
