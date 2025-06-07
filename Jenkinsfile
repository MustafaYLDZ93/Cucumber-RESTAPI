pipeline {
    agent any

    parameters {
        string(name: 'CUCUMBER_TAG', defaultValue: '', description: 'Run tests with this tag (e.g., @login, @register). Leave empty to run all tests.')
    }

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:$PATH"
        // Branch'e göre ortam ayarları
        TEST_ENV = "${env.BRANCH_NAME == 'main' ? 'production' : 'test'}"
    }

    stages {
        stage('Branch Info') {
            steps {
                sh '''
                echo "=== BRANCH INFO ==="
                echo "Current Branch: ${BRANCH_NAME}"
                echo "Test Environment: ${TEST_ENV}"
                '''
            }
        }
        
        
        
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                sh '''
                    echo "=== PATH ==="
                    echo $PATH
                    node --version
                    npm --version
                    pwd
                    ls -la
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }

        stage('Run Tests'){
            steps{
                script{
                    def tagOption = params.CUCUMBER_TAG?.trim() ? "--tags ${params.CUCUMBER_TAG}" : ""

                    // branch'e göre farklı test komutları
                    if (env.BRANCH_NAME == 'main') {
                        sh "npx cucumber-js ${tagOption} --format progress --format json:cucumber-report.json --format html:cucumber-report.html"
                    } else if (env.BRANCH_NAME == 'test') {
                        // develop branch için
                        sh "npx cucumber-js ${tagOption} --format progress --format json:cucumber-report.json --format html:cucumber-report.html"
                    } else {
                        //diğer branch'ler için
                        sh "npx cucumber-js ${tagOption} --format progress --format json:cucumber-report.json --format html:cucumber-report.html"
                    }
                }
            }

        }


        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'cucumber-report.html,cucumber-report.xml'
            }
        }

        stage('Publish JUnit Report') {
            steps {
                junit 'cucumber-report.xml'
            }
        }

        // Publish HTML Report adımı kaldırıldı, sadece artifacts olarak sunulacak
    }

    post {
        always {
            echo 'Pipeline completed'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
