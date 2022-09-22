# Honeygest
* A tool that identifies which services a Kubernetes cluster run and suggests a helm chart of Honeypots that covers the corresponding services.
# Arguments
options:

    -n, --name    The name of the generated Helm Chart
    -s, --service Service type for exposing the Honeypots (Loadbalancer or Nodeport)
    -v, --volume  path where the logs from the Honeypots will be saved in the host os
    -ip, --ip     LoadBalancer ip (if LoadBalancer type is selected)
# How to run
python3 honeypots_suggestion.py [options...]