def init() {
    node {
        env.NODEJS_HOME = "${tool 'node'}"
        env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

        stage('Build') {
            sh '''
                npm install
                npm run build
            '''
        }
    }
}

init()