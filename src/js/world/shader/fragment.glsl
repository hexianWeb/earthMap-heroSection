// fragment.glsl
uniform sampler2D uTexture;
uniform float uTime;
uniform float uFadeStart;
uniform float uMaxDistance;
uniform float uStrength;
uniform float uNoiseStrength;  // 新增：噪声强度
uniform float uNoiseSpeed;     // 新增：噪声变化速度
uniform float uMoveSpeed;      // 新增：整体移动速度

varying vec2 vUv;

// 伪随机函数
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
        // 基础左移速度 (负值表示向左)
    float baseOffsetX = uTime * uMoveSpeed * -0.0001;

    // 生成动态噪声
    vec2 noiseCoord = vUv * 10.0 + uTime * uNoiseSpeed*0.005;
    float noiseX = random(floor(noiseCoord + 0.5));
    float noiseY = random(floor(noiseCoord - 0.5));

    // 合成偏移量
    vec2 offset = vec2(
        baseOffsetX + (noiseX - 0.5) * uNoiseStrength,
        (noiseY - 0.5) * uNoiseStrength * 0.5  // Y轴幅度减半
    );

    // 应用UV偏移
    vec2 offsetUv = vUv + offset;
    // 获取纹理颜色
    vec4 textureColor = texture2D(uTexture, offsetUv);
    // 计算距离 (0.5, 0.0) 的距离
    float distanceToCenter = distance(vUv, vec2(0.5, 0.0));

    // 计算透明度
    float alpha = 1.0 - smoothstep(uFadeStart, uMaxDistance, distanceToCenter);

    // 设置最终颜色，保持原始颜色，但改变透明度
    gl_FragColor = vec4(textureColor.rgb*uStrength, alpha);
}
