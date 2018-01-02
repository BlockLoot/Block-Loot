def init() {
    node {
        env.NODEJS_HOME = "${tool 'Node 9.x'}"
        env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

        stage('check tools') {
            sh "node -v"
            sh "npm -v"
        }
    }
}

init()