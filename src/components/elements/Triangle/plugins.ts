import { Chart } from 'chart.js/dist/types/index';
import { ISample, IOptions } from './types';

const getDistance = (point1: ISample, point2: ISample): number => {
    const xDiff = point2.x - point1.x;
    const yDiff = point2.y - point1.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

export const triangleSideMarkPlugin = {
    id: "triangleSideMarkPlugin",
    afterDraw: (chart: Chart<any>, args: any, options: IOptions['plugins']['triangleSideMarkPlugin']) => {
        if(options.draw == undefined) return;

        const points: ISample[] = chart.getDatasetMeta(0).data.map(datapoint => ({x: datapoint.x, y: datapoint.y}))
        const ctx = chart.ctx;
        
        const aSign = chart.scales.x.getValueForPixel(points[2].x)
        const bSign = chart.scales.y.getValueForPixel(points[1].y)

        const aOffsetX: number = -15 * Math.sign(aSign ? aSign : 0);
        const cOffsetX: number = 15 * Math.sign(aSign ? aSign : 0) * Math.sign(bSign ? bSign : 0);
        const bOffsetY: number = 15 * Math.sign(bSign ? bSign : 0);


        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'rgba(209, 120, 65, 0.8)';
        ctx.font = "25px serif";

        const hypotenuse: ISample = {
            x: (points[1].x + points[2].x) / 2,
            y: (points[1].y + points[2].y) / 2,
        };

        const adjacent: ISample = {
            x: (points[1].x + points[0].x) / 2 + aOffsetX,
            y: (points[1].y + points[0].y) / 2,
        }

        const opposite: ISample = {
            x: (points[0].x + points[2].x) / 2,
            y: (points[0].y + points[2].y) / 2 + bOffsetY,
        }


        const dx: number = points[1].x - points[2].x
        const dy: number = points[1].y - points[2].y

        const hNormal: ISample[] = [
            {
                x: -dy,
                y: dx,
            },
            {
                x: dy,
                y: -dx,
            }
        ]

        const hVector: ISample = {
            x: (hNormal[1].x + hypotenuse.x) - (hNormal[0].x + hypotenuse.x),
            y: (hNormal[1].y + hypotenuse.y) - (hNormal[0].y + hypotenuse.y)
        }

        const magnitude = Math.sqrt(hVector.x ** 2 + hVector.y ** 2)

        const hUnitVector: ISample = {
            x: hVector.x / magnitude,
            y: hVector.y / magnitude
        }

        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("a", opposite.x, opposite.y);
        ctx.fillText("b", adjacent.x, adjacent.y);
        ctx.fillText("c", -hUnitVector.x * cOffsetX + hypotenuse.x, -hUnitVector.y * cOffsetX + hypotenuse.y);

        ctx.restore();
    }
  };


const getAngle = (pointA: ISample, pointB: ISample, pointC: ISample): number => {
  const AB: number = getDistance(pointA, pointB)
  const BC: number = getDistance(pointB, pointC)
  const AC: number = getDistance(pointA, pointC)
  return Math.acos((AB**2 + BC**2 - AC**2) / (2 * AB * BC))
}

const getBisector = (pointA: ISample, pointB: ISample, pointC: ISample) => {
  const aVector = {
    x: (pointC.x - pointB.x) / getDistance(pointB, pointC),
    y: (pointC.y - pointB.y) / getDistance(pointB, pointC),
  }

  const bVector = {
    x: (pointA.x - pointB.x) / getDistance(pointB, pointA),
    y: (pointA.y - pointB.y) / getDistance(pointB, pointA),
  }

  const bisectorVector = {
    x: (aVector.x + bVector.x),
    y: (aVector.y + bVector.y),
  }

  const bisectorUnitVector = {
    x: bisectorVector.x / Math.sqrt(bisectorVector.x**2 + bisectorVector.y**2),
    y: bisectorVector.y / Math.sqrt(bisectorVector.x**2 + bisectorVector.y**2),
  }

  return bisectorUnitVector
}

export const triangleAngleMarkPlugin = {
    id: "triangleAngleMarkPlugin",
    afterDraw: (chart: Chart<any>, args: any, options: IOptions['plugins']['triangleSideMarkPlugin']) => {
        if(options.draw == undefined) return;

        const points: ISample[] = chart.getDatasetMeta(0).data.map(datapoint => ({x: datapoint.x, y: datapoint.y}))
        const ctx = chart.ctx;

        ctx.strokeStyle = 'rgba(209, 120, 65, 0.8)';

        const aValue = chart.scales.x.getValueForPixel(points[2].x)
        const aSign: number = Math.sign((aValue ? aValue : 0))

        const bValue = chart.scales.y.getValueForPixel(points[1].y)
        const bSign: number = Math.sign((bValue ? bValue : 0))

        const bcAngle = getAngle(points[0], points[1], points[2])
        const acAngle = getAngle(points[1], points[2], points[0])

        const bcRadius = getDistance(points[1], points[0])/3
        ctx.beginPath();
        ctx.arc(
          points[1].x, 
          points[1].y, 
          bcRadius, 
          Math.PI/2 - Number(bSign < 0) * Math.PI, 
          Math.PI/2 - Number(bSign < 0) * Math.PI - (bcAngle * aSign * bSign), 
          aSign * bSign > 0) // b-c angle
        ctx.stroke();

        const baRadius = Math.min(getDistance(points[0], points[1])/4, getDistance(points[0], points[2])/4) 
        ctx.beginPath();
        ctx.arc(
          points[0].x, 
          points[0].y,
          baRadius, 
          Math.PI*(3/2) * bSign, 
          Math.PI*(3/2) * bSign + (Math.PI/2 * bSign * aSign), 
          bSign * aSign < 0) // b-a angle
        ctx.stroke()

        const acRadius = getDistance(points[2], points[0])/3
        ctx.beginPath();
        ctx.arc(
          points[2].x, 
          points[2].y, 
          acRadius, 
          Math.PI - Number(aSign < 0) * Math.PI, 
          Math.PI - (Number(aSign < 0) * Math.PI) + (acAngle * bSign * aSign), 
          bSign * aSign < 0) // c-a angle
        ctx.stroke()

        const bcBisectorUnitVector = getBisector(points[0], points[1], points[2])
        const acBisectorUnitVector = getBisector(points[1], points[2], points[0])
        const baBisectorUnitVector = getBisector(points[1], points[0], points[2])

        ctx.fillStyle = 'white';
        ctx.font = "25px serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("•", points[0].x + baBisectorUnitVector.x * baRadius * 0.5, points[0].y + baBisectorUnitVector.y * baRadius * 0.5);
        ctx.fillText("β", points[1].x + bcBisectorUnitVector.x * bcRadius * 0.7, points[1].y + bcBisectorUnitVector.y * bcRadius * 0.7);
        ctx.fillText("α", points[2].x + acBisectorUnitVector.x * acRadius * 0.7, points[2].y + acBisectorUnitVector.y * acRadius * 0.7);
        ctx.restore()
    }
}
