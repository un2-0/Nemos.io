FROM eris/decerver:latest

USER root
COPY start.sh /home/$user/

# Copy in langauges config for compiler
RUN mkdir --parents /home/$user/.decerver/languages
COPY spec/languages_config.json /home/$user/.decerver/languages/config.json

# Get the DAPP.
RUN mkdir --parents /home/$user/.decerver/dapps/SmartVote
WORKDIR /home/$user/.decerver/dapps/SmartVote

COPY . /home/$user/.decerver/dapps/SmartVote/

RUN chown --recursive $user /home/$user
USER $user

CMD ~/start.sh
