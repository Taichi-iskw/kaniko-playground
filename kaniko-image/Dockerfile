FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    curl bash awscli git ca-certificates && \
    apt-get clean

COPY executor /kaniko/executor
RUN chmod +x /kaniko/executor

RUN /kaniko/executor version

# デフォルト動作（デバッグ用）
WORKDIR /workspace

ENTRYPOINT ["/bin/bash", "-c"]
CMD ["sleep", "infinity"]