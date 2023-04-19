const modules = import.meta.globEager("../../public/img/index/*.jpg");
//public/img/index目录下面所有图片
let imageArray: Array<string> = [];
// Object.keys(modules).forEach((path) => {
//     //匹配path为./xx的格式，匹配./的后面的部分名称
//     const fileName = path.replace(/(.*\/)*([\s\S]*?)/gi, "$2");
//     //拼接图片路径
//     const filePath = withBase("/img/index/" + fileName);
//     imageArray.push(filePath);
// });

imageArray = [
    'http://cdn.boyxy.cn/images/IMG_20200414_083618.jpg',
    'http://cdn.boyxy.cn/images/IMG_20210102_160345.jpg',
    'http://cdn.boyxy.cn/images/IMG_20210605_145358.jpg',
    'http://cdn.boyxy.cn/images/IMG_20220927_113717.jpg',
    'http://cdn.boyxy.cn/images/IMG_20220929_105925.jpg',
    'http://cdn.boyxy.cn/images/IMG_20220930_131927.jpg',
    'http://cdn.boyxy.cn/images/IMG_20221202_203406.jpg',
    'http://cdn.boyxy.cn/images/mmexport1599122115860.jpg',
    'http://cdn.boyxy.cn/images/mmexport1599122118366.jpg',
    'http://cdn.boyxy.cn/images/mmexport1599122134751.jpg'

]

import { usePageFrontmatter, PageFrontmatterRef, withBase } from "@vuepress/client";
import { onMounted, onUnmounted, nextTick, watch, reactive } from 'vue';
import { isMobile } from '../utils'
export const useBanner = () => {
    const frontmatter = usePageFrontmatter() as PageFrontmatterRef<Blog.Home>;
    let fx: any
    const {
        bgImage,
        bgImageSec = 4000,
        isBgImagetrigger = true,
        needDefaultImages = true,
        heroText,
        tagline,
        bgImageStyle = { height: '550px', color: '#fff' },
        showArrow = true,
        bubbles = true,
    } = frontmatter.value;
    /**banner组件参数 */
    const bannerOptions = reactive({
        bgImageSec,
        isBgImagetrigger,
        showArrow,
        tagline,
        heroText,
        bgImageStyle,
        bubbles
    });

    /**获取图片，如果开启随机切换图片，返回全部，否则返回一个 */
    const getRandomImage = (): Array<string> | string => {
        //和默认图片一起混用，图片合并，反之只使用外部配置图片
        const image = needDefaultImages ? mixImage(bgImage) : (bgImage as Array<string>);
        //判断是否开启自动更换，不开启，每次刷新更换
        return isBgImagetrigger ? image : image[Math.floor(Math.random() * image.length)];
    };
    /**自定义图片和默认图片合并去重*/
    const mixImage = (mixImageArray?: Array<string>) => {
        //数组合并，去重
        return mixImageArray ? Array.from(new Set(imageArray.concat(mixImageArray))) : imageArray;
    };
    onMounted(() => {
        nextTick(() => {
            /**slider动画 */
            fx = new flux.slider("#banner", {
                autoplay: bannerOptions.isBgImagetrigger,
                pagination: true,
                width: "100%",
                height: Number(bgImageStyle.height.slice(0, -2)),
                delay: bannerOptions.bgImageSec
            });
        })
        bannerOptions.bgImageStyle = isMobile.value ? { color: '#fff' } : bgImageStyle
        watch(isMobile, (newVal, oldVal) => {
            if (newVal) {
                bannerOptions.bgImageStyle = { color: '#fff' }
            } else {
                bannerOptions.bgImageStyle = bgImageStyle
            }
        })
    })
    onUnmounted(() => {
        if (fx) {
            fx = null
        }
    })
    return { getRandomImage, bannerOptions };
};
