FROM alpine:3.18

RUN apk add --no-cache bash curl aws-cli

ENV KANIKO_VERSION=v1.21.0

RUN mkdir -p /kaniko && \
    curl -L -o /kaniko/executor \
    https://github.com/GoogleContainerTools/kaniko/releases/download/${KANIKO_VERSION}/executor && \
    chmod +x /kaniko/executor

WORKDIR /workspace

ENTRYPOINT ["/bin/bash", "-c"]
CMD ["sleep infinity"]