-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link.url_unique" ON "Link"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Link.slug_unique" ON "Link"("slug");
