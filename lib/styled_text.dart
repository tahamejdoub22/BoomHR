import 'dart:ui';

import 'package:flutter/material.dart';

abstract class AppStyledText {
  static const bodyMain = const TextStyle(
      fontSize: 13,
      color: Colors.transparent,
      fontWeight: FontWeight.w500,
      fontFamily: "DM Sans-Medium",
      fontStyle: FontStyle.normal,
      letterSpacing: 0);
  static bodyMainColor(Color color) => TextStyle(
      fontSize: 13,
      color: color,
      fontWeight: FontWeight.w500,
      fontFamily: "DM Sans-Medium",
      fontStyle: FontStyle.normal,
      letterSpacing: 0);

  static const subHeadlineMain = const TextStyle(
      fontSize: 14,
      color: Colors.transparent,
      fontWeight: FontWeight.w700,
      fontFamily: "DM Sans-Bold",
      fontStyle: FontStyle.normal,
      letterSpacing: 0);
  static subHeadlineMainColor(Color color) => TextStyle(
      fontSize: 14,
      color: color,
      fontWeight: FontWeight.w700,
      fontFamily: "DM Sans-Bold",
      fontStyle: FontStyle.normal,
      letterSpacing: 0);

  static const captionSubdue = const TextStyle(
      fontSize: 11,
      color: Colors.transparent,
      fontWeight: FontWeight.w400,
      fontFamily: "DM Sans-Regular",
      fontStyle: FontStyle.normal,
      letterSpacing: 0);
  static captionSubdueColor(Color color) => TextStyle(
      fontSize: 11,
      color: color,
      fontWeight: FontWeight.w400,
      fontFamily: "DM Sans-Regular",
      fontStyle: FontStyle.normal,
      letterSpacing: 0);

  static const subHeadlineSubdue = const TextStyle(
      fontSize: 14,
      color: Colors.transparent,
      fontWeight: FontWeight.w500,
      fontFamily: "DM Sans-Medium",
      fontStyle: FontStyle.normal,
      letterSpacing: 0);
  static subHeadlineSubdueColor(Color color) => TextStyle(
      fontSize: 14,
      color: color,
      fontWeight: FontWeight.w500,
      fontFamily: "DM Sans-Medium",
      fontStyle: FontStyle.normal,
      letterSpacing: 0);

  static const headlineMain = const TextStyle(
      fontSize: 16,
      color: Colors.transparent,
      fontWeight: FontWeight.w700,
      fontFamily: "DM Sans-Bold",
      fontStyle: FontStyle.normal,
      letterSpacing: 0);
  static headlineMainColor(Color color) => TextStyle(
      fontSize: 16,
      color: color,
      fontWeight: FontWeight.w700,
      fontFamily: "DM Sans-Bold",
      fontStyle: FontStyle.normal,
      letterSpacing: 0);

  static const bodySubdue = const TextStyle(
      fontSize: 13,
      color: Colors.transparent,
      fontWeight: FontWeight.w400,
      fontFamily: "DM Sans-Regular",
      fontStyle: FontStyle.normal,
      letterSpacing: 0);
  static bodySubdueColor(Color color) => TextStyle(
      fontSize: 13,
      color: color,
      fontWeight: FontWeight.w400,
      fontFamily: "DM Sans-Regular",
      fontStyle: FontStyle.normal,
      letterSpacing: 0);
}
