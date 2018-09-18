pipeline {

    // agent any
    agent {
        // Run on any linux container with docker installed
        label 'docker'
    }

    parameters {
        string(name: 'DOCKER_IMAGE', defaultValue: 'cariza/github-microservice-demo-branches', description: 'Docker repository')
        string(name: 'PORT', defaultValue: '2995', description: 'Run on port')
        string(name: 'CONTAINER_NAME', defaultValue: 'github-microservice-demo-branches', description: 'The name the container will run as')
    }

    environment {
        PORT = "${params.PORT}"
    }

    stages {
        stage('Build docker image') {
            steps {
                sh('docker ps')
                // sh("docker stop \$(docker ps | grep ${params.DOCKER_IMAGE} | awk '{print \$1}') || true")
                // sh('docker run --rm -d -p ${params.PORT}:${params.PORT} --name=${params.DOCKER_IMAGE}:latest')
                sh("docker build  --build-arg PORT='${params.PORT}' -t ${params.DOCKER_IMAGE} . ")
            }
        }
        stage('Push docker image') {
            steps {
                sh("docker login -u cariza -p P@ssw0rd!")
                sh("docker push ${params.DOCKER_IMAGE} ")
            }
        }
        stage('Check docker image can run as container') {
            steps {
                sh("docker service create \
                        --name ${params.CONTAINER_NAME} \
                        --network jenkins_jenkins-stack \
                        --publish ${params.PORT}:${params.PORT} \
                        ${params.DOCKER_IMAGE} ")
            }
        }
        stage('Run integration tests on container') {
            steps {
                sh('echo "No integration tests yet. TODO. Just doing curl for now. "')

                sh("curl ${params.CONTAINER_NAME}:${params.PORT}")
                sh("docker logs ${params.DOCKER_IMAGE}")
                sh("docker service rm ${params.CONTAINER_NAME}")
            }
        }
    }
}