FROM ubuntu
RUN apt-get update -y
RUN apt-get install python3 python3-pip -y
RUN apt-get install libaio1 libaio-dev
ARG P=/test/instantclient
ENV LD_LIBRARY_PATH=$P
COPY . /test
WORKDIR /test
RUN pip3 install -r requirement.txt
RUN export LD_LIBRARY_PATH=/test/instantclient:$LD_LIBRARY_PATH
RUN export PATH="/test/instantclient:$PATH"
RUN pwd
ENTRYPOINT ["python3"]
CMD ["get_occupancy_status.py"]
