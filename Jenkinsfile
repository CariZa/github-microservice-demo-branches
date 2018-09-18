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


//                 docker service create --name jenkins \
// #  --publish 8082:8080 \
// #  --publish 50000:50000 \
// #  -e JENKINS_OPTS="--prefix=/jenkins" \
// #  --reserve-memory 300m \
// #  --mount "type=volume,source=jenkins_vol,target=/var/jenkins_home" \
// #  --constraint 'node.labels.jenkins_vol == true' \
// #  jenkins

                // sh('docker stop ${params.DOCKER_IMAGE} || true')
                // sh("docker run -d --rm \
                //         --name ${params.CONTAINER_NAME} \
                //         --network jenkins_jenkins-stack \
                //         -p ${params.PORT}:${params.PORT} \
                //         ${params.DOCKER_IMAGE} ")
                sh("docker service create \
                        --name ${params.CONTAINER_NAME} \
                        --network jenkins-stack \
                        --publish ${params.PORT}:${params.PORT} \
                        ${params.DOCKER_IMAGE} ")
                
                sh("sleep 30s")
            }
        }
        stage('Run integration tests on container') {
            steps {
                sh('echo "No integration tests yet. TODO. Just doing curl for now. "')

                sh("curl ${params.CONTAINER_NAME}:${params.PORT}")
                sh("docker logs ${params.DOCKER_IMAGE}")
                sh("docker service rm ${params.DOCKER_IMAGE}")
            }
        }
    }
}