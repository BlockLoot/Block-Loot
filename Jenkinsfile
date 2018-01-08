def init() {
    node {
        env.NODEJS_HOME = "${tool 'node'}"
        env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

        stage('Checkout') {
            checkout scm
        }

        stage('Build') {
            sh '''
                npm install
                npm run build
            '''
        }

        stage('Deploy') {
            withAWS(credentials:'aws') {
                s3Delete(bucket:'blockloot.com', path:'/')
                s3Upload(file:'dist/', bucket:'blockloot.com', path:'')
                cfInvalidate(distribution:'ET680G060AKME', paths:['/*'])
            }
        }
    }
}

init()
