node {
    // uncomment these 2 lines and edit the name 'node-9.3.0' according to what you choose in configuration
    def nodeHome = tool name: 'node-9.3.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"

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