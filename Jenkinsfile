def init() {
    node {
        stage('check tools') {
            sh "node -v"
            sh "npm -v"
        }

        stage('checkout') {
            checkout scm
        }

        stage('npm install') {
            sh "npm install"
        }
    }
}

init();