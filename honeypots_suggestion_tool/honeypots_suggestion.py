import os
import re
import requests
import argparse
# -name " " -service LoadBalancer -ip -volumes 
#input string format

#NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)                                   AGE
#conpot-conpot-chart   LoadBalancer   10.100.74.222    <pending>       80:31018/TCP,102:31848/TCP                31d
#cowrie-cowrie-chart   LoadBalancer   10.106.14.202    139.91.130.22   22:31947/TCP,23:30739/TCP                 105d
#kubernetes            ClusterIP      10.96.0.1        <none>          443/TCP                                   337d
#log4j-log4j-chart     LoadBalancer   10.107.175.88    139.91.130.26   8080:32687/TCP                            104d
#pcl                   LoadBalancer   10.100.31.107    139.91.130.24   102:31957/TCP,502:31888/TCP               64d
#w-windows-plc         NodePort       10.108.44.42     <none>          80:31395/TCP                              59d
#wplc-windows-plc      LoadBalancer   10.101.220.157   139.91.130.23   80:30980/TCP,102:31145/TCP,161:32201/UDP  64d

url = 'http://139.91.71.18:8081'
endpoint="/suggestion"

def parse_user_input():
    parser = argparse.ArgumentParser()
    user_input= {}
    parser.add_argument("-n", "--name", type=str, help = "name of the helm chart",required=False)
    parser.add_argument("-s", "--service", type=str,choices=["Nodeport","LoadBalancer"] ,help = "type of service (Nodeport or LoadBalancer)",required=False)
    parser.add_argument("-v", "--volume", type=str, help = "path that logs will be stored in host",required=False)
    parser.add_argument("-ip", "--ip", type=str, help = "LoadBalancer ip",required=False)
    args = parser.parse_args()
    if args.service=="LoadBalancer":
        if  not args.ip:
            print("error using LoadBalancer as a service requires -ip argument")
            exit(-1)

    #print(args)
    
    #exit(1)
    return {"name": args.name, "service": args.service, "volume": args.volume, "ip":args.ip }


def parse_table_input(input):
    table_as_dict={}
    #find header strings
    lines=input.splitlines()
    header= input.splitlines()[0].split()
    for header_value in header :
        table_as_dict[header_value]=[]
    for i in range(1, len(lines)):
        for index,data in enumerate(lines[i].split()):
 
            table_as_dict[header[index]].append(data)
    return table_as_dict

def flatten(xss):
    return [x for xs in xss for x in xs]
def main():
    input_dict = parse_user_input()
    #print(input_dict)
    out= os.popen('kubectl get svc').read()
    services_table = parse_table_input(out)
    payload= {"user_input":"","port_information":""}
    port_information=[]
    for ports in services_table["PORT(S)"]:
        port_protocol_map= {"ports":[],"protocol":"TCP"}
        port_information.append(re.split("/|,|:",ports))
       
    #print(port_information)
    #print(port_information)
    port_information=flatten(port_information)
    payload["port_information"]=port_information
    payload["user_input"]=input_dict

    print(payload)


    response = requests.post(url+endpoint, json = payload)
    #x = requests.post(url, json = port_information)
    
    data=(response.content)
    with open("test.zip", 'wb') as s:
        s.write(data)



    #print(out.split())
main()