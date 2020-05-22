FROM node:14
RUN apt-get update -y
RUN apt-get install python3 python3-pip -y
RUN apt-get install libaio1 libaio-dev
ARG P=/test/instantclient
ENV LD_LIBRARY_PATH=$P
ENV TNS_ADMIN=/test/Wallet_LAPARKING
COPY . /test
WORKDIR /test
RUN npm install
RUN export LD_LIBRARY_PATH=/test/instantclient:$LD_LIBRARY_PATH
RUN export PATH="/test/instantclient:$PATH"
EXPOSE 5000
ENTRYPOINT ["node"]
CMD ["server.js"]
