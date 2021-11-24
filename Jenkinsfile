#!/usr/bin/env groovy

pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                script {
                    echo "Building the application..."
                    sh 'npm install'
                }
            }
        }
        stage('test') {
            steps {
                script {
                    echo "Testing the application..."
                }
            }
        }
         stage('build image') {
            steps {
                script {
                    echo "building the docker image..."
                    withCredentials([usernamePassword(credentialsId: 'dockerHub-credential', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh 'docker build -t solei90l/mvp-starter:-1.0 .'
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh 'docker push nanajanashia/mvp-starter:-1.0'

                    }
                }
            }
        }
        stage('deploy') {
            steps {
                script {
                    def dockerCmd = 'docker run -p 3000:3000 -d solei90l/mvp-starter:1.0 '
                    sshagent(['ec2-server-key']) {
                       sh "ssh -o StrictHostKeyChecking=no ec2-user@13.38.5.112 ${dockerCmd}"
                    }
                }
            }
        }
    }
}
