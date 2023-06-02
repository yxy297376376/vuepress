---
title: 关系图谱
date: 2023-05-09 15:30:27
description: 搭建一个基于衍生词的关系图谱。
lang: zh-CN
tag:
  - 关系图谱
category:
  - 可视化
image: http://cdn.boyxy.cn/images/mmexport1599122124700.jpg
# sidebar: 'auto'
sticky: 0
---

&emsp;关系图谱设计中，最广泛使用的图表组件[`echarts graph`](!https://echarts.apache.org/examples/zh/index.html#chart-type-graph),但在力引导布局方式（考虑节点数量和 link 数量）和交互方式上来说，在进行了多次尝试之后，最终考虑使用[`Antv G6`](!https://g6.antv.antgroup.com/zh/examples/interaction/highlight/#highlightDark)。再次记录遇到的困难和解决方案。

<!-- more -->

::: warning
1、在初始化阶段采用`echarts`的时候，大部分功能（自定义 drag,散点分类，基本布局）都是基本可以实现的。但发现`echarts`内置的 force 力引导布局并不像`Antv G6`高度自定义布局以及交互行为（散点的分组 Combo，相邻点&边状态设置，画布行为，轮廓包裹等）。

2、在使用`echarts`时，如果不使用`force力引导布局`，就需要填充散点数据的 x,y 坐标值。出于自定义行为的理念，最终使用`Antv G6`来完成数据量庞大的图谱。
:::

> 本文采用 yarn 安装依赖，使用 npm 也可以。以下分别安装 Graphin 的核心组件@antv/graphin 和 分析组件@antv/graphin-components，以及 Graphin 官方提供的图标库@antv/graphin-icons

::: code-tabs#shell

@tab yarn

```bash
yarn add @antv/graphin@latest --save
yarn add @antv/graphin-components@latest --save
yarn add @antv/graphin-icons --save
```

@tab:active npm

```bash
npm i @antv/graphin@latest --save
npm i @antv/graphin-components@latest --save
npm i @antv/graphin-icons --save
```

:::

### 布局配置

#### 引入图谱插件，定义初始化布局

```js
componentDidMount() {
  const { data, onDetail } = this.props;

  /** 插件集Tooltip */
  const tooltip = new G6.Tooltip({
    offsetX: 10,
    offsetY: 0,
    // v4.2.1 起支持 fixToNode，tooltip 相对于节点固定位置
    fixToNode: [1, 0],
    // the types of items that allow the tooltip show up
    // 允许出现 tooltip 的 item 类型
    itemTypes: ['node', 'edge'],
    // custom the tooltip's content
    // 自定义 tooltip 内容
    getContent: (e) => {
      const outDiv = document.createElement('div');
      outDiv.style.width = 'fit-content';

      if (e.item.getType() === 'node') {
        outDiv.innerHTML = `
        <h4 style="padding:0 7px;">${e.item.getModel().label}</h4>
          <div>发文量: ${e.item.getModel().value}</div>
       `;
      } else {
        const { source_name, target_name } = e.item.getModel();

        outDiv.innerHTML = `
        <h4 style="padding:0 7px;">${source_name + '>' + target_name}</h4>
       `;
      }

      return outDiv;
    },
  });

  const containerWidth = document.body.clientWidth - 300;
  const containerHeight = document.documentElement.clientHeight - 100;

  /** 实例化Graph 配置 */
  graph = new G6.Graph({
    container: document.getElementById('container'),
    width: containerWidth,
    height: containerHeight,
    modes: {
      default: [
        {
          type: 'zoom-canvas',
          enableOptimize: true,
          minZoom: 0.1,
          maxZoom: 6,
          // optimizeZoom: 0.9,
        },
        {
          type: 'drag-canvas',
          enableOptimize: true,
        },
        'drag-node',
        'brush-select',
        // {
        //   type: 'activate-relations',
        // },
      ], // 'drag-canvas',
    },
    defaultNode: {
      labelCfg: {
        style: {
          fontSize: 13,
        },
        position: 'right',
        offset: 1,
      },
      style: {
        cursor: 'pointer',
      },
    },
    edgeStateStyles: {
      highlight: {
        stroke: '#999',
      },
    },
    defaultEdge: {
      // type: 'line',
      style: {
        // stroke: '#d7d7c9',
        cursor: 'pointer',
        // startArrow: {
        //   path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
        //   fill: '#d7d7c9',
        // },
        // endArrow: {
        //   path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
        //   fill: '#d7d7c9',
        // },
      },
      // type: 'arc',
      // labelCfg: {
      //   autoRotate: true,
      //   refY: -10,
      // },
    },
    layout: {
      type: 'force2',
      // kr: 10,
      animate: true,
      preventOverlap: true,
      // distanceThresholdMode: 'min',
      damping: 0.7,
      gravity: 150,
      nodeSize: 10,
      degree: 0,
      onLayoutEnd: () => {
        // 可选
        console.log('force layout done');
      },
      workerEnabled: false, // 可选，开启 web-worker
      gpuEnabled: false, // 可选，开启 GPU 并行计算，G6 4.0 支持
      // preset: {
      //   type: 'random',
      // },
    },
    animate: true,
    autoPaint: true,
    optimizeThreshold: 2000,
    plugins: [tooltip],
    fitCenter: false,
  });
  graph.data(data);
  graph.render();

  graph.on('node:mouseover', async (evt) => {
    evt.preventDefault();
    const item = evt.item;
    this.focusNodesAndEdges(item);
  });

  graph.on('canvas:click', (evt) => {
    this.clearNodeStates();
  });

  const handleClick = (evt) => {
    const node = evt.item;
    const model = node.getModel();
    // apis.focusNodeById(model.id);
    // graph.focusItem(node);
    onDetail?.({
      keyword: model.name,
      type: 1,
    });
  };
  const handleClick1 = (evt) => {
    const node = evt.item;
    const model = node.getModel();

    const { source_name, target_name } = model;

    onDetail?.({
      keyword: [target_name, source_name].join('_'),
      type: 2,
    });
  };

  // 每次点击聚焦到点击节点上
  graph.on('edge:click', handleClick1);

  graph.on('node:click', handleClick);
}

```

#### 动态数据更新视图，布局模式根据节点和 link 关系来动态设置。

- 清除缓存数据

```js
/** 清空缓存数据，避免自定义Node配置污染布局 */
graph.clear()
graph.destroyLayout()
```

- 动态更新画布
  > 通过 [graph 实例方法](!https://g6.antv.antgroup.com/api/graph-func/data)更新数据源，根据新的数据重新渲染视图。

```js
/** ChangeData 触发数据更新视图 */
graph.changeData({
  nodes: [],
  edges: [],
  combos: []
})

/**
 * 布局Force2 配置
 * 参考文档：https://g6.antv.antgroup.com/api/graph-layout/force2
 */
let layout = {
  type: 'force2',
  animate: true, // 设置为 false 可关闭布局动画
  animateCfg: {
    duration: 500,
    easing: 'easeCubic'
  },
  /**库伦系数，斥力的一个系数，数字越大，节点之间的斥力越大 默认值：0.005 */
  coulombDisScale: 0.0006,
  /** 阻尼系数，取值范围 [0, 1]。数字越大，速度降低得越慢 */
  damping: 0.008,
  /** 中心力大小，指所有节点被吸引到 center 的力。数字越大，布局越紧凑 */
  gravity: 10,
  // linkDistance: 200,
  clustering: false,
  nodeClusterBy: 'category',
  clusterNodeStrength: 200,
  preventOverlap: true,
  autoPaint: true,
  optimizeThreshold: 3000,
  fitCenter: false,
  ...onLayoutSpeed(data.nodes, data.edges)
  // minMovement: data.edges?.length,
  // maxIteration: data.nodes?.length,
  // distanceThresholdMode: 'min',
}

graph.updateLayout(layout)

/** 画布适应居中*/
graph.fitCenter()

graph.render()
```

- Resize

```js
/** Resize */
const container = document.getElementById('container')
if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return
    if (!container || !container.scrollWidth || !container.scrollHeight) return
    graph.changeSize(container.scrollWidth, container.scrollHeight)
  }
```

3. 卸载组件时销毁画布,避免内存泄漏

```js
  componentWillUnmount() {
    if (graph) {
      /** 清空缓存数据，避免自定义Node配置污染布局 */
      graph.clear();
      graph.destroyLayout();
      graph = null;
    }
  }
```

4.插件引入

1.注册插件

```js
// Background Animation
G6.registerNode(
  'background-animate',
  {
    afterDraw(cfg, group) {
      const r = cfg.size / 2
      const back1 = group.addShape('circle', {
        zIndex: -3,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.style.stroke,
          opacity: 0.6
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'back1-shape'
      })
      const back2 = group.addShape('circle', {
        zIndex: -2,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.style.stroke,
          opacity: 0.6
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'back2-shape'
      })
      const back3 = group.addShape('circle', {
        zIndex: -1,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.style.stroke,
          opacity: 0.6
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'back3-shape'
      })
      group.sort() // Sort according to the zIndex
      back1.animate(
        {
          // Magnifying and disappearing
          r: r + 20,
          opacity: 0.3
        },
        {
          duration: 4000,
          easing: 'easeCubic',
          delay: 0,
          repeat: true // repeat
        }
      ) // no delay
      back2.animate(
        {
          // Magnifying and disappearing
          r: r + 20,
          opacity: 0.3
        },
        {
          duration: 4000,
          easing: 'easeCubic',
          delay: 1000,
          repeat: true // repeat
        }
      ) // 1s delay
      back3.animate(
        {
          // Magnifying and disappearing
          r: r + 20,
          opacity: 0.3
        },
        {
          duration: 4000,
          easing: 'easeCubic',
          delay: 2000,
          repeat: true // repeat
        }
      ) // 3s delay
    }
  },
  'circle'
)
```

- 相邻节点状态处理

```js
/**
 * 高亮当前节点 & 相邻节点（包括边）
 * @param {*} currentNode 当前节点实例
 * @param {boolean} isFollow 是否聚焦到视口中心
 */
focusNodesAndEdges = async (currentNode, isFollow = false) => {
  if (currentNode) {
    graph.setAutoPaint(false)
    await graph.getNodes().forEach((node) => {
      graph.clearItemStates(node)
      graph.setItemState(node, 'inactive', true)
    })
    graph.setItemState(currentNode, 'inactive', false)
    graph.setItemState(currentNode, 'active', true)
    currentNode.toFront()

    if (isFollow) {
      graph.zoomTo(1.5)
      graph.focusItem(currentNode, true)
    }

    graph.getEdges().forEach(function (edge) {
      if (edge.getSource() === currentNode) {
        graph.setItemState(edge.getTarget(), 'inactive', false)
        graph.setItemState(edge.getTarget(), 'active', true)
        graph.setItemState(edge, 'active', true)
        edge.getTarget().toFront()
        edge.toFront()
      } else if (edge.getTarget() === currentNode) {
        graph.setItemState(edge.getSource(), 'inactive', false)
        graph.setItemState(edge.getSource(), 'active', true)
        graph.setItemState(edge, 'active', true)
        edge.toFront()
        edge.getSource().toFront()
      } else {
        graph.setItemState(edge, 'active', false)
        graph.setItemState(edge, 'inactive', true)
      }
    })
    graph.paint()
    graph.setAutoPaint(true)
  } else {
    message.error('未找到！')
  }
}

/** 清除节点所有状态 */
clearNodeStates = () => {
  graph.setAutoPaint(false)
  graph.getNodes().forEach(function (node) {
    graph.clearItemStates(node)
  })
  graph.getEdges().forEach(function (edge) {
    graph.clearItemStates(edge)
  })

  // graph.zoomTo(1);
  graph.paint()
  graph.setAutoPaint(true)
}
```
