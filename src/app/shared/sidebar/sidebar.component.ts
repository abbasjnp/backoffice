import { Component, Input, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  @Input('navs') navs;

  constructor() { }
  ngAfterViewInit() {
    // $('#menu ul').hide();
    // // $('#menu ul:first').show();
    // $('#menu li a').click(function () {
    //   var checkElement = $(this).next();
    //   if (checkElement.is('ul') && checkElement.is(':visible')) {
    //     return false;
    //   }
    //   if (checkElement.is('ul') && !checkElement.is(':visible')) {
    //     $('#menu ul:visible').slideUp('normal');
    //     checkElement.slideDown('normal');
    //     return false;
    //   }
    // });
    // $(".mySidenav").click(function () {
    //   $("body").toggleClass("show_sidebar");
    //   $(".mySidenav .fa").toggleClass(""); // toggle 2 classes in Jquery: http://goo.gl/3uQAFJ - http://goo.gl/t6BQ9Q
    // });
  }
}
