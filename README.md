# Maupassant

It is a hugo theme forked from [maupassant-hugo](https://github.com/rujews/maupassant-hugo).

是我对 maupassant-hugo 这个主题的个人客制化

[Theme Preview](https://blog.zilch40.wang)

## Features

相比 [maupassant-hugo](https://github.com/rujews/maupassant-hugo) 添加了 TOC 功能，去掉了我不想要的功能.

本来想 fork 之后提个 PR，但是发现除了增加 TOC 之外其他地方也有不少改动已经很难 merge 了就作罢了

因为功能的减少，主页资源 gzip 传输只有 20kB，文章页要大一点.

## Installation

In your hugo site folder, run

```
git clone https://github.com/wlh320/maupassant-hugo themes/maupassant
```

Then configure it in `config.toml` as the following part suggesting.

To write new blog, run `hugo new posts/your-title.md`.

To enable `Arhives` and `About` columns, run `hugo new archives/index.md` and `hugo new about/index.md` respectively.

## Config

我主要自己用，可配置项就很少，如果真有人用的话会增加.

Basic `config.toml` file

```toml
# base config
baseURL = "https://example.org"
languageCode = "zh-CN"
title = "Blog"
theme = "maupassant"

# config
enableRobotsTXT = true
paginate = 6
googleAnalytics = ""

[params]
  author = "xxx"
  subtitle = "xxx"
  keywords = "xxx"
  description = "xxx"

  # 本主题的配置项
  toc = true
  autoCollapseToc = true
  mathjax = true

[menu]

  [[menu.main]]
    identifier = "archives"
    name = "归档"
    url = "/archives/"
    weight = 3

  [[menu.main]]
    identifier = "about"
    name = "关于"
    url = "/about/"
    weight = 4
```

Besides, you can change theme color in `asserts/css/style.scss`.

# TODO

- [ ] i18n 国际化
- [ ] higher configurability 高可配置性
- [ ] better typography 更好的文档排版

