import { pageTitle } from 'ember-page-title';
import { LinkTo } from '@ember/routing';

<template>
  {{pageTitle "SsgTests"}}

  <LinkTo @route="index">Index</LinkTo>
  <LinkTo @route="face">Face</LinkTo>

  {{outlet}}


</template>
