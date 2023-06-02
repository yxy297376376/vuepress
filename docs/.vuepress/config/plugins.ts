import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
import { readingTimePlugin } from "vuepress-plugin-reading-time2"
import { seoPlugin } from "vuepress-plugin-seo2";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { copyrightPlugin } from "vuepress-plugin-copyright2";
import { bgmMusicPlayer } from '@anyfork/vuepress-plugin-bgm-player-next'
import { cursorEffects } from '@anyfork/vuepress-plugin-cursor-effects-next'
import { dynamicTitle } from '@anyfork/vuepress-plugin-dynamic-title-next'
import { kanBanNiang } from '@anyfork/vuepress-plugin-kan-ban-niang-next'
import { ribbon } from '@anyfork/vuepress-plugin-ribbon-next'
import { sakura } from '@anyfork/vuepress-plugin-sakura-next'
import { blogPlugin } from "vuepress-plugin-blog2";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { commentPlugin } from "vuepress-plugin-comment2";
import { containerPlugin } from '@vuepress/plugin-container'
import { resolveContainerOptions } from './container'
import { loadingPage } from '@anyfork/vuepress-plugin-loading-page-next'
import { path } from '@vuepress/utils'

export const plugins = [
    // 注册全局插件
    registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, '../theme/components/global'),
    }),
    //docsearch插件,https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html
    // docsearchPlugin({
    //     apiKey: 'e3224f6a8f05632af9c14c9767650b54',
    //     indexName: 'anyfork',
    //     appId: '09V7PWK61N',
    //     placeholder: '搜索文档',
    //     locales: {
    //         '/': {
    //             placeholder: '搜索文档',
    //             translations: {
    //                 button: {
    //                     buttonText: '搜索文档',
    //                 },
    //             },
    //         }
    //     }
    // }),
    //pwa插件,https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa.html#web-app-manifests
    pwaPlugin(),
    //pwa-popup弹框,https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa-popup.html
    pwaPopupPlugin({
        locales: {
            '/': {
                message: '发现新内容可用',
                buttonText: '点我刷新',
            }
        },
    }),
    //预计阅读时间与字数统计插件，https://vuepress-theme-hope.github.io/v2/reading-time/zh/
    readingTimePlugin({}),
    // seo插件，https://vuepress-theme-hope.github.io/v2/seo/
    // seoPlugin({
    //     hostname: 'http://www.boyxy.cn/',
    //     author: {
    //         name: '杨舒',
    //         url: 'http://www.boyxy.cn/'
    //     }
    // }),
    // siteMap站点地图插件，https://vuepress-theme-hope.github.io/v2/sitemap/zh/config.html
    sitemapPlugin({
        hostname: 'http://www.boyxy.cn/',
        extraUrls: ['http://www.boyxy.cn/']
    }),
    //代码复制插件，https://vuepress-theme-hope.github.io/v2/copy-code/zh/
    copyCodePlugin({
        selector: '.theme-default-content div[class*="language-"] pre',
        locales: {
            '/': {
                copy: '复制成功!',
                hint: 'copy!'
            }
        }
    }),
    //复制加版权插件，https://vuepress-theme-hope.github.io/v2/copyright/zh/config.html
    // copyrightPlugin({
    //     hostname: 'http://www.boyxy.cn/',
    //     author: "杨舒",
    //     global: true
    // }),
    //音乐播放器插件。
    bgmMusicPlayer({
        audios: [

            {
                name: '且听风吟',
                artist: '朴树',
                url: 'http://cdn.boyxy.cn/songs/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F-%E6%9C%B4%E6%A0%91.mp3',
                cover: 'https://p1.music.126.net/xuW0eAX30At9yn8vp0Z3AA==/83562883723684.jpg'
            },
            {
                name: '蓝莲花',
                artist: '许巍',
                url: 'http://cdn.boyxy.cn/songs/%E8%93%9D%E8%8E%B2%E8%8A%B1-%E8%AE%B8%E5%B7%8D.mp3',
                cover: 'https://gimg3.baidu.com/yule/src=http%3A%2F%2Fgips0.baidu.com%2Fit%2Fu%3D985532286%2C1600523813%26fm%3D3007%26app%3D3007%26f%3DJPEG%3Fw%3D500%26h%3D500&refer=http%3A%2F%2Fwww.baidu.com&app=2019&size=w931&n=0&g=0n&q=75&fmt=auto?sec=1682182800&t=009b5d6e48f222bf007d993e49d2db08'
            },
            {
                name: '世界末日',
                artist: '周杰伦',
                url: 'http://cdn.boyxy.cn/songs/%E4%B8%96%E7%95%8C%E6%9C%AB%E6%97%A5-%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3',
                cover: '/music/canon/canon.jpg'
            },
            {
                name: '一生有你',
                artist: '水木年华',
                url: 'http://cdn.boyxy.cn/songs/%E4%B8%80%E7%94%9F%E6%9C%89%E4%BD%A0-%E6%B0%B4%E6%9C%A8%E5%B9%B4%E5%8D%8E.mp3',
                cover: 'https://p1.ifengimg.com/a/2017_40/6d89e7f6c0d6154_size131_w650_h648.jpgg'
            },
            {
                name: '无条件',
                artist: '陈奕迅',
                url: 'http://cdn.boyxy.cn/songs/%E6%97%A0%E6%9D%A1%E4%BB%B6-%E9%99%88%E5%A5%95%E8%BF%85.mp3',
                cover: '/music/canon/canon.jpg'
            },
            {
                name: 'See You again',
                artist: '',
                url: 'http://cdn.boyxy.cn/songs/see%20you%20again.mp3',
                cover: '/music/canon/canon.jpg'
            },

        ],
        autoShrink: true,
        floatStyle: { bottom: '100px', 'z-index': '999999' },
        color: 'rgb(103, 204, 134)'
    }),
    //鼠标点击特效插件
    cursorEffects({
        size: 4,
        shape: 'star'
    }),
    //动态title特效插件
    // @ts-ignore
    dynamicTitle({
        showText: '杨舒的博客',
        hideText: '自由和希望的交界处'
    }),
    //看板娘
    // kanBanNiang({
    //     width: 300,
    //     height: 500
    // }),
    //彩带
    ribbon({
        size: 120, // 默认数据
        opacity: 0.3, //  透明度
        zIndex: -1, //  层级
        option: {
            // 色带HSL饱和度
            colorSaturation: '80%',
            // 色带HSL亮度量
            colorBrightness: '60%',
            // 带状颜色不透明度
            colorAlpha: 0.65,
            // 在HSL颜色空间中循环显示颜色的速度有多快
            colorCycleSpeed: 6,
            // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
            verticalPosition: 'max',
            // 到达屏幕另一侧的速度有多快
            horizontalSpeed: 200,
            // 在任何给定时间，屏幕上会保留多少条带
            ribbonCount: 3,
            // 添加笔划以及色带填充颜色
            strokeSize: 0,
            // 通过页面滚动上的因子垂直移动色带
            parallaxAmount: -0.5,
            // 随着时间的推移，为每个功能区添加动画效果
            animateSections: true
        },
        //  点击彩带  true显示  false为不显示
        ribbonShow: false,
        // 滑动彩带
        ribbonAnimationShow: true
    }),
    //樱花特效
    sakura({
        sakura_zindex: 1,
        sakura_img: '/img/blue.png'
    }),
    //博客插件,https://vuepress-theme-hope.github.io/v2/blog/zh/guide.html
    blogPlugin({
        // 页面过滤器，此函数用于鉴别页面是否作为文章。
        filter: ({ filePathRelative }) => filePathRelative ? filePathRelative?.startsWith("posts/") : false,
        // 获取文章信息的函数。
        getInfo: (page) => ({
            ...page
        }),
        category: [
            {
                key: "category",
                getter: (page) => <string[]>page.frontmatter.category || [],
                layout: "Category",
                itemLayout: "Category",
                frontmatter: () => ({ title: "Categories", sidebar: true }),
                itemFrontmatter: (name) => ({
                    title: `Category ${name}`,
                    sidebar: true,
                }),
            },
            {
                key: "tag",
                getter: (page) => <string[]>page.frontmatter.tag || [],
                layout: "Tag",
                itemLayout: "Tag",
                frontmatter: () => ({ title: "Tags", sidebar: false }),
                itemFrontmatter: (name) => ({
                    title: `Tag ${name}`,
                    sidebar: false,
                }),
            },
        ],

        type: [
            {
                key: "article",
                //需要过滤的条件
                filter: (page) => !page.frontmatter.archive,
                path: "/article/",
                layout: "Layout",
                frontmatter: () => ({ title: "Articles", sidebar: false }),
                // sort pages with time and sticky
                sorter: (pageA, pageB) => {
                    if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
                        return pageA.frontmatter.sticky as number - (pageB.frontmatter.sticky as number);
                    if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky)
                        return -1;
                    if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1;
                    if (!pageB.frontmatter.date) return 1;
                    if (!pageA.frontmatter.date) return -1;
                    return (
                        new Date(pageB.frontmatter.date).getTime() - new Date(pageA.frontmatter.date).getTime()
                    );
                },
            },
            {
                key: "timeline",
                // only article with date should be added to timeline
                filter: (page) => page.frontmatter.date ? true : false,
                // sort pages with time
                sorter: (pageA, pageB) => new Date(pageB.frontmatter.date as string).getTime() - new Date(pageA.frontmatter.date as string).getTime(),
                path: "/timeline/",
                layout: "Timeline",
                frontmatter: () => ({ title: "Timeline", sidebar: false }),
            },
            {
                key: "See",
                // only article with date should be added to timeline
                filter: (page) => page.frontmatter.date ? true : false,
                // sort pages with time
                sorter: (pageA, pageB) => new Date(pageB.frontmatter.date as string).getTime() - new Date(pageA.frontmatter.date as string).getTime(),
                path: "/see/",
                layout: "See",
                frontmatter: () => ({ title: "asdsa", sidebar: false }),
            },
        ],
        hotReload: true,
    }),
    //markdown 增强插件，https://vuepress-theme-hope.github.io/v2/md-enhance/zh/guide/
    mdEnhancePlugin({
        // 启用自定义容器
        container: true,
        // 启用导入支持
        include: true,
        // 启用代码演示
        demo: true,
        align: true,
        // 启用脚注
        footnote: true,
        // 开启标记
        mark: true,
        // 启用 figure
        figure: true,
        // 启用图片懒加载
        imgLazyload: true,
        // 启用图片标记
        imgMark: true,
        // 启用图片大小
        imgSize: true,
        // 开启卡片支持
        card: true,
        // 启用幻灯片
        // presentation: true
        codetabs: true
    }),
    //Waline评论插件,https://vuepress-theme-hope.github.io/v2/comment/zh/config/giscus.html
    commentPlugin({
        provider: 'Twikoo',
        envId: 'ysblog-2gf6vyp9c460aa61'
    }),
    //自定义容器cardList
    containerPlugin(resolveContainerOptions('cardList')),
    //自定义容器cardImgList
    containerPlugin(resolveContainerOptions('cardImgList')),
    //loading插件
    loadingPage()
]