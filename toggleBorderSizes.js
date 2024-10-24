import solidStylesheet from 'solidstyles' with { type: "css" };
import dashedStylesheet from 'dashedstyles' with { type: "css" };

export function toggleBorderSizes() {
    const stylesheets = [solidStylesheet, dashedStylesheet];

    stylesheets.forEach(stylesheet => {
        const rules = Array.from(stylesheet.cssRules);
        rules.forEach(rule => {
            if (rule.selectorText === 'h1') {
                const borderSize = rule.style.borderWidth;
                if (borderSize === '3px') {
                    rule.style.borderWidth = '6px';
                } else if (borderSize === '6px') {
                    rule.style.borderWidth = '3px';
                }
            }
        });
    });
}