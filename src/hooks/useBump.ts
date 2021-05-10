export const useBump = ({
  width,
  height,
  data,
  interpolation,
  xPadding,
  xOuterPadding,
  yOuterPadding,
  lineWidth,
  activeLineWidth,
  inactiveLineWidth,
  colors,
  opacity,
  activeOpacity,
  inactiveOpacity,
  pointSize,
  activePointSize,
  inactivePointSize,
  pointColor,
  pointBorderWidth,
  activePointBorderWidth,
  inactivePointBorderWidth,
  pointBorderColor,
  isInteractive,
  currentSerie,
}) => {
  const { series: rawSeries, xScale, yScale } = useMemo(
    () =>
      computeSeries({
        width,
        height,
        data,
        xPadding,
        xOuterPadding,
        yOuterPadding,
      }),
    [width, height, data, xPadding, xOuterPadding, yOuterPadding]
  );

  const lineGenerator = useLineGenerator(interpolation);

  const getColor = useOrdinalColorScale(colors, "id");
  const getSerieStyle = useSerieStyle({
    lineWidth,
    activeLineWidth,
    inactiveLineWidth,
    opacity,
    activeOpacity,
    inactiveOpacity,
    isInteractive,
    currentSerie,
  });

  const series = useMemo(
    () =>
      rawSeries.map((serie) => {
        const nextSerie = { ...serie };
        nextSerie.color = getColor(nextSerie);
        nextSerie.style = getSerieStyle(nextSerie);
        return nextSerie;
      }),
    [rawSeries, getColor, getSerieStyle]
  );

  const theme = useTheme();
  const getPointColor = useInheritedColor(pointColor, theme);
  const getPointBorderColor = useInheritedColor(pointBorderColor, theme);
  const getPointStyle = usePointStyle({
    pointSize,
    activePointSize,
    inactivePointSize,
    pointBorderWidth,
    activePointBorderWidth,
    inactivePointBorderWidth,
    isInteractive,
    currentSerie,
  });
  const points = useMemo(() => {
    const pts = [];
    series.forEach((serie) => {
      serie.points.forEach((rawPoint) => {
        const point = {
          ...rawPoint,
          serie,
          serieId: serie.id,
          isActive: currentSerie === serie.id,
          isInactive: currentSerie !== null && currentSerie !== serie.id,
        };
        point.color = getPointColor(point);
        point.borderColor = getPointBorderColor(point);
        point.style = getPointStyle({ ...point, serie });
        pts.push(point);
      });
    });

    return pts;
  }, [series, getPointColor, getPointBorderColor, getPointStyle, currentSerie]);

  return {
    xScale,
    yScale,
    series,
    points,
    lineGenerator,
  };
};
