![Image of Arch.](https://github.com/appddictionstudio/MDAS/blob/master/main/MDAS.png)

As a product owner, I need to be able to review data and re-collect all the
information used for the research.

MDAS Data Science Factor 2
==========================

### Cloud Service Provider

AWS

### Frontend Environment

-   Angular 9

-   Chart.js

-   Ng2-Charts

### Backend Language

-   Phython

>   Web Framework - Flask

### Python Packages

>   Sci Kit Learn - https://scikit-learn.org/stable/ Numpy -
>   https://www.numpy.org/ Pandas - https://pandas.pydata.org/ Statsmodels -
>   https://www.statsmodels.org/stable/index.html xlrd -
>   https://pypi.org/project/xlrd/ pydotplus -
>   https://pypi.org/project/pydotplus/

Jupyter Notebooks
-----------------

Install Jupyter Notebooks by running the following:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
pip install jupyter 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To view the Jupyter notebooks within Chrome; navigate to the main directoy and
enter in the following:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
jupyter notebook
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

API Library
-----------

>   Request - https://2.python-requests.org//en/master/ Install by using:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
pip install requests
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Data Gathering Tech.
--------------------

-   Pull a CSV from https://www.nasdaq.com/screening/company-list.aspx and
    insert into the package under the assets folder.

Terraform
---------

-   Terraform is being used to configure, deploy and provision infrastructure
    using an Infrastructure as Code approach.

-   What is happening under the covers?

-   A Virtual Private Cloud (VPC) is created and a subnet is created and
    associated with the new VPC.

-   An internet gateway is created to allow access from the web.

-   A security group is created to allow traffic on ports 80 (http) and 22 (ssh)

-   A key pair is also created using a public and private key that have been
    committed as part of the repository.

-   Lastly, an EC2 instance is created. Once the instance is available for use
    terraform provisioners handle updating packages, installing necessary
    packages and setting up the EC2 instance to be used as a docker host.

Docker & Docker-Compose
-----------------------

-   Docker is being used to describe and configure the flask web server required
    to host the Python RESTful API

-   As well as, the Postgres database required for storage of company, industry
    and sector data.

-   Lastly, Docker is being used to serve the Angular Single Page Application
    that is responsible for providing the data retrieved to the end-user in
    different manners.

-   Docker Compose is being used to launch all 3 applications in a cohesive
    manner while simplifying communications between the docker containers.

Deploying Solution
------------------

1.  Download Terraform CLI from <https://www.terraform.io/downloads.html>. Place
    the executable in a safe location and add the executable to the System
    \$PATH or to the Environment Variables.

2.  Clone the repository from <https://github.com/appddictionstudio/MDAS.git>

3.  Using either a command prompt or a bash shell, navigate to the repository
    cloned in step 2 and enter the infrastructure directory and then enter the
    terraform directory

4.  Take the terraform.tfvars-template file and rename the file to
    terraform.tfvars

5.  In the new terraform.tfvars file modify the user access key, secret key and
    region to match the credentials for AWS account being used for evaluation.

6.  Execute the “terraform apply” command using the command prompt or bash shell
    previously opened in step 3. Once a plan is outline type “yes” and click
    “Enter”. This will begin the infrastructure deployment. Once the script
    completes an entire environment has been deployed to AWS supporting the
    entire application from database to RESTful API to Angular front-end.

CI/CD
-----

-   Maintaining an entire environment for an application on a single EC2
    instance is intended to allow simpler deployment and a true DevOps delivery
    pipeline. Rather than redeploying the application to a new environment the
    entire environment could be promoted without the need for even a virtual
    handoff.
