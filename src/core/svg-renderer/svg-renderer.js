import { SVG_RENDER_TYPES } from '../ControllerConstants';
import { createCircles, renderCircles } from './circle';
import { createCurves, renderCurves } from './curve';
import { createLines, renderLines } from './line';
import { createRecursivePaths, renderPaths } from './recursive';
import { createConcentricPaths, renderConcentricPaths } from './concentric'

export function renderSvgString(imageData, svgSettings, width, height, done) {
  const {
    outputScale
  } = svgSettings;

  setImmediate(() => {
    const dimensionsString = `height="${height * outputScale}" width="${width * outputScale}"`;
    const nameSpaceString = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
    let svgString = `<svg ${dimensionsString} ${nameSpaceString}>`;

    // eslint-disable-next-line default-case
    switch (svgSettings.svgRenderType) {
      case SVG_RENDER_TYPES.CIRCLE: {
        const circles = createCircles(svgSettings, imageData, width, height);

        svgString += renderCircles(svgSettings, circles);
        break;
      }
      case SVG_RENDER_TYPES.CURVE: {
        const curves = createCurves(svgSettings, imageData, width, height);

        svgString += renderCurves(svgSettings, curves);
        break;
      }
      case SVG_RENDER_TYPES.LINE: {
        const lines = createLines(svgSettings, imageData, width, height);

        svgString += renderLines(svgSettings, lines);
        break;
      }
      case SVG_RENDER_TYPES.RECURSIVE: {
        const lines = createRecursivePaths(svgSettings, imageData, width, height);

        svgString += renderPaths(svgSettings, lines);
        break;
      }
      case SVG_RENDER_TYPES.CONCENTRIC: {
        const concentricPaths = createConcentricPaths(svgSettings, imageData, width, height);

        svgString +=  renderConcentricPaths(svgSettings, concentricPaths, width/2, height/2);
      }
    }

    svgString += '</svg>';

    done(svgString);
  });
}
