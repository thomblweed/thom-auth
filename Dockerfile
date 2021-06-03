FROM denoland/deno:1.10.3

EXPOSE 3001

WORKDIR /app

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

ADD . .

RUN deno cache app.ts

CMD ["run", "--allow-net", "app.ts"]