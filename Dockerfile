FROM eris/decerver:latest

USER root
COPY start.sh /home/$user/

# Copy in langauges config for compiler
RUN mkdir --parents /home/$user/.eris/languages
COPY spec/languages_config.json /home/$user/.eris/languages/config.json

# Get the DAPP.
RUN mkdir --parents /home/$user/.eris/dapps/SmartVote
WORKDIR /home/$user/.eris/dapps/SmartVote

COPY . /home/$user/.eris/dapps/SmartVote/

RUN chown --recursive $user /home/$user
USER $user

CMD ~/start.sh
