import React, { useEffect, useRef, useState } from 'react';
import { rpc } from './bridge';
import { renderNode, SHADOW_STYLE, UiNode } from './pluginUi';

/**
 * 插件页面：把某个插件的 UI 树**内嵌**渲染在页面里（而不是右下角浮窗）。
 *
 * 用法：侧边栏点「皮肤」→ <PluginPage pluginId="skin-library" />。
 * 进入页面时先让插件重渲染一次（action = refresh），再接收 vein:ui 事件绘制。
 */
export function PluginPage({
  pluginId,
  title,
  subtitle,
}: {
  pluginId: string;
  title: string;
  subtitle?: string;
}) {
  const [tree, setTree] = useState<UiNode | null>(null);
  const [error, setError] = useState('');
  const hostRef = useRef<HTMLDivElement | null>(null);
  const styleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail as { pluginId?: string; tree?: UiNode };
      if (detail?.pluginId === pluginId && detail.tree?.type) {
        setTree(detail.tree);
        setError('');
      }
    };
    window.addEventListener('vein:ui', handler);

    // 让插件重新渲染一次：插件在激活时渲染的树可能早于本页面挂载
    rpc('plugins.uiAction', [pluginId, 'refresh', {}]).catch((err) => {
      setError((err as Error).message);
    });

    return () => window.removeEventListener('vein:ui', handler);
  }, [pluginId]);

  // 注入与浮窗一致的样式（只注一次）
  useEffect(() => {
    const host = styleRef.current;
    if (!host || host.dataset.done) return;
    const style = document.createElement('style');
    style.textContent =
      SHADOW_STYLE.replace(/:host/g, '.plugin-inline') +
      `
      .plugin-inline .vp-panel {
        width: auto; max-width: 1080px; box-shadow: none;
        background: transparent; border: 0; padding: 0;
      }
      .plugin-inline .vp-image { display: block; }
      .plugin-inline .vp-text { white-space: pre-line; }
      `;
    host.appendChild(style);
    host.dataset.done = '1';
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    host.innerHTML = '';
    if (!tree) return;
    const node = renderNode(tree, pluginId);
    if (node) host.appendChild(node);
  }, [tree, pluginId]);

  return (
    <div className="page">
      <div className="page-head">
        <h1>{title}</h1>
        {subtitle && <span className="muted">{subtitle}</span>}
      </div>
      <div className="plugin-inline" style={{ marginTop: 18 }}>
        <div ref={styleRef} />
        {!tree && (
          <p className="muted">
            {error ? `插件不可用：${error}` : '正在向插件请求界面…'}
          </p>
        )}
        <div ref={hostRef} />
      </div>
    </div>
  );
}
