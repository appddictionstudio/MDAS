provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
}

resource "aws_key_pair" "auth" {
  key_name   = "${var.key_name}"
  public_key = "${file(var.public_key_path)}"
}

# Create a VPC to launch our instances into
resource "aws_vpc" "mdas" {
  cidr_block = "10.2.0.0/16"
  enable_dns_hostnames = true
}

# Create an internet gateway to give our subnet access to the outside world
resource "aws_internet_gateway" "mdas" {
  vpc_id = "${aws_vpc.mdas.id}"
}

# Grant the VPC internet access on its main route table
resource "aws_route" "internet_access" {
  route_table_id         = "${aws_vpc.mdas.main_route_table_id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = "${aws_internet_gateway.mdas.id}"
}

# Create a subnet to launch our instances into
resource "aws_subnet" "mdas" {
  vpc_id                  = "${aws_vpc.mdas.id}"
  cidr_block              = "10.2.1.0/24"
  map_public_ip_on_launch = true
}

resource "aws_security_group" "mdas" {
  name        = "mdas_security_group"
  description = "Used for web services"
  vpc_id      = "${aws_vpc.mdas.id}"

  # SSH access from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP access from the VPC
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "docker_host" {
  ami           = "ami-0ebbf2179e615c338"
  instance_type = "t2.micro"
  tags = {Name = "mdas docker host"}
  subnet_id = "${aws_subnet.mdas.id}"
#   security_groups = ["${aws_security_group.mdas.id}"]
  vpc_security_group_ids = ["${aws_security_group.mdas.id}"]
  associate_public_ip_address = true
  key_name = "${aws_key_pair.auth.id}" 

  provisioner "remote-exec" {
    connection {
        user = "ec2-user"
        host = self.public_ip
        private_key = "${file(var.private_key_path)}"
    }

    inline = [
        # "sudo curl  https://download.docker.com/linux/centos/docker-ce.repo -o /etc/yum.repos.d/docker-ce.repo",
        "sudo yum update -y",
        "sudo amazon-linux-extras install -y docker",
        "sudo service docker start",
        "sudo usermod -a -G docker ec2-user",
        "sudo chkconfig docker on",
        "sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose",
        "sudo chmod +x /usr/local/bin/docker-compose",
        "docker-compose version",
        "mkdir ~/mdas",
        "mkdir ~/mdas/infrastructure",
        # "scp -o StrictHostKeyChecking=no -r ../../. ec2-user@${self.public_ip}:~/mdas"
    #   "sudo yum -y install python3",
    #   "sudo"
    #   "sudo apt-get -y install nginx",
    #   "sudo service nginx start",
    ]
  }

  provisioner "file" {
    connection {
        user = "ec2-user"
        host = self.public_ip
        private_key = "${file(var.private_key_path)}"
    }

    source      = "../../assets"
    destination = "~/mdas"
  }

  provisioner "file" {
    connection {
        user = "ec2-user"
        host = self.public_ip
        private_key = "${file(var.private_key_path)}"
    }

    source      = "../../frontend"
    destination = "~/mdas"
  }

  provisioner "file" {
    connection {
        user = "ec2-user"
        host = self.public_ip
        private_key = "${file(var.private_key_path)}"
    }

    source      = "../../backend"
    destination = "~/mdas"
  }

  provisioner "file" {
    connection {
        user = "ec2-user"
        host = self.public_ip
        private_key = "${file(var.private_key_path)}"
    }

    source      = "../../infrastructure/docker"
    destination = "~/mdas/infrastructure/docker"
  }
}