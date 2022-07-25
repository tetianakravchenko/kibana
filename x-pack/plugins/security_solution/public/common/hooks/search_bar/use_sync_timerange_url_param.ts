/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { UrlInputsModel } from '../../store/inputs/model';
import { inputsSelectors } from '../../store/inputs';
import { useUpdateUrlParam } from '../../utils/global_query_string';
import { CONSTANTS } from '../../components/url_state/constants';

export const useSyncTimerangeUrlParam = () => {
  const updateTimerangeUrlParam = useUpdateUrlParam<UrlInputsModel>(CONSTANTS.timerange);
  const getInputSelector = useMemo(() => inputsSelectors.inputsSelector(), []);
  const inputState = useSelector(getInputSelector);

  const { linkTo: globalLinkTo, timerange: globalTimerange } = inputState.global;
  const { linkTo: timelineLinkTo, timerange: timelineTimerange } = inputState.timeline;

  useEffect(() => {
    updateTimerangeUrlParam({
      global: {
        [CONSTANTS.timerange]: globalTimerange,
        linkTo: globalLinkTo,
      },
      timeline: {
        [CONSTANTS.timerange]: timelineTimerange,
        linkTo: timelineLinkTo,
      },
    });
  }, [updateTimerangeUrlParam, globalLinkTo, globalTimerange, timelineLinkTo, timelineTimerange]);
};
