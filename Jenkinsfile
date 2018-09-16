pipeline {
    agent {
        // Run on any linux container with docker installed
        label 'linux'
    }

    parameters {
        string(name: 'DOCKER_IMAGE', defaultValue: 'cariza/github-microservice-demo-branches', description: 'Docker repository')
    }

    environment {
        PORT = "${params.PORT}"
    }

    stages {
        stage('Build docker image') {
            steps {
                sh('docker ps')
                sh("docker stop \$(docker ps | grep ${params.github-microservice-demo-branches} | awk '{print \$1}') || true")
                sh('docker run --rm -d -p ${params.PORT}:${params.PORT} --name=${params.github-microservice-demo-branches}:latest')
                sh("docker build  --build-arg PORT='${params.PORT}' -t ${params.DOCKER_IMAGE} . ")
            }
        }
        stage('Push docker image') {
            steps {
                sh("docker login -u cariza -p P@ssw0rd!Nedbank")
                sh("docker push ${params.DOCKER_IMAGE} ")
            }
        }
        stage('Check docker image can run as container') {
            steps {
                sh('docker stop ${params.DOCKER_IMAGE} || true')
                sh("docker run -d --rm \
                        --name ${params.DOCKER_IMAGE} \
                        -p ${params.PORT}:${params.PORT} \
                        ${params.DOCKER_IMAGE} ")
                sh("sleep 30s")
            }
        }
        stage('Run integration tests on container') {
            steps {
                sh('echo "No integration tests yet. TODO. Just doing curl for now. "')

                sh('curl ${params.DOCKER_IMAGE}:${params.PORT}')
                sh("docker logs ${params.DOCKER_IMAGE}")
                sh('docker stop ${params.DOCKER_IMAGE}')
            }
        }
        // stage('Pull updates on node XQABDO05') {
            // steps {
                // sh "ssh devteam@XQABDO05 && docker pull ${params.DOCKER_IMAGE}"
            // }
        // }
    }
}