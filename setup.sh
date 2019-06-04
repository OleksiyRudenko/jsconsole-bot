#!/bin/bash

usage()
{
    cat <<- _USAGE_
    Usage:
      setup.sh install
        - install project dependencies and now CLI
      setup.sh login <your_email_address_with_now_account>
        - login into now service
      setup.sh save_token <telegram_bot_token>
        - save telegram bot token
      setup.sh set_webhook <app_target_url_domain_with_now>
        - communicate webhook to Telegram servers
      setup.sh deploy
        - deploy the app with now service
_USAGE_
}

##### Main

if [ $# -gt 0 ]; then
    case $1 in
            install )     yarn install
                          npm install -g now
                          exit
                          ;;
            login )       if [ "$2" != "" ]; then
                          	now login $2
                          else
                          	echo "Usage: ./setup.sh login <your_email_address_with_now_account>"
                          fi
                          exit
                          ;;
            save_token )  if [ "$2" != "" ]; then
                              now secrets add jsconsole_bot_telegram_api_token $2
                          else
                              echo "Usage: ./setup.sh save_token <telegram_api_token>"
                          fi
                          exit
                          ;;
            set_webhook ) usage
                          # curl -F "url=$2/start_bot" https://api.telegram.org/bot$3/setWebhook
                          exit
                          ;;
            deploy )      now
                          exit
                          ;;
            * )           usage
                          exit 1
        esac
else
    usage
fi
