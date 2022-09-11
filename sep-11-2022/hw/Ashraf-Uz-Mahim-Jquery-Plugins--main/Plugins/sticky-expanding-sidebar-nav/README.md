# jQuery Sticky Side Navigation Menu - ssMenu
Sticky Side Navigation Menu - Simple, easy to use and user friendly sticky side navigation menu with jQuery ssMenu plugin.
## Dependency 
jQuery 3.3.1 and FontAwesome 4.7.0

## How to Use
1. Load the jQuery and Font Awesome into HTML document.

     <pre class="prettyprint lang-html">
&lt;!--Font Awesome--&gt;
&lt;link href=&quot;https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css&quot; rel=&quot;stylesheet&quot; integrity=&quot;sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN&quot; crossorigin=&quot;anonymous&quot;&gt;
&lt;!--jQuery--&gt;
 &lt;script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'&gt;&lt;/script&gt;
</pre>
            <p> 2. Include the ssMenu CSS and JavaScript file into your project. </p>
            <pre class="prettyprint lang-html">
&lt;!--ssMenu CSS--&gt;
&lt;link rel=&quot;stylesheet&quot; href=&quot;css/ss-menu.css&quot;&gt;

&lt;!--ssMenu JS--&gt;
&lt;script src=&quot;js/jquery.ss.menu.js&quot;&gt;&lt;/script&gt;  
  </pre>
            <p> 3. Create HTML structure for ssMenu with the <code> nav </code> element that contains unordered list with your menu links. </p>
            <pre class="prettyprint lang-html">
&lt;!--Start Side Sticky Menu--&gt;
&lt;nav class=&quot;ss-menu &quot;&gt;
   &lt;ul&gt;
      &lt;li&gt;&lt;a href=&quot;#1&quot;&gt;&lt;i class=&quot;fa fa-android&quot;&gt;&lt;/i&gt;  Apps Development&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;#1&quot;&gt; &lt;span class=&quot;ss-badge&quot;&gt;6&lt;/span&gt; &lt;i class=&quot;fa fa-bar-chart&quot;&gt;&lt;/i&gt; Business &amp; Marketing &lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;#1&quot;&gt;&lt;i class=&quot;fa fa-heartbeat&quot;&gt;&lt;/i&gt; Life Insurance&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;#1&quot;&gt;&lt;i class=&quot;fa fa-bank&quot;&gt;&lt;/i&gt; Bank Loans&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;#1&quot;&gt;&lt;i class=&quot;fa fa-cc-paypal&quot;&gt;&lt;/i&gt; Bank Marketing&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;#1&quot;&gt;&lt;i class=&quot;fa fa-bookmark-o&quot;&gt;&lt;/i&gt; Insurance Policies &lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;#1&quot;&gt;&lt;i class=&quot;fa fa-car&quot;&gt;&lt;/i&gt; Vehicle Insurance &lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;#1&quot;&gt;&lt;i class=&quot;fa fa-briefcase&quot;&gt;&lt;/i&gt; Online Insurance&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;#1&quot;&gt;&lt;i class=&quot;fa fa-location-arrow&quot;&gt;&lt;/i&gt; Nearest Bank&lt;/a&gt;&lt;/li&gt;
   &lt;/ul&gt;
&lt;/nav&gt;
&lt;!--End Side Sticky Menu--&gt;
</pre>
            <p> 4. Initialize ssMenu Plugin in jQuery document ready function.</p>
            <pre class="prettyprint lang-js">
$(document).ready(function(){

$(".ss-menu").ssMenu();

});    

</pre>
            <p> 5. To change the theme, just put the name of theme in the following option. </p>
            <pre class="prettyprint lang-js">
$(document).ready(function(){

$(".ss-menu").ssMenu({
  theme: "theme-name",

});

});    

</pre>
            <p> All available themes are as follows:</p>
            <ol>
               <li> red</li>
               <li>yellow  </li>
               <li> blue </li>
               <li>green </li>
               <li> orange </li>
               <li>brown </li>
               <li> teal</li>
               <li> purple</li>
            </ol>
            <p> 6. To hide navigation on scroll down. default: false  </p>
            <pre class="prettyprint lang-js">
$(".ss-menu").ssMenu({
  hideOnScroll: true,

});
</pre>
            <p> 7. To add additional CSS properties into ssMenu, put the CSS values in the following object.  </p>
            <pre class="prettyprint lang-js">
$(".ss-menu").ssMenu({
 additionalCSS: ({ 
 'background' : '', //custom background color
	'color' : '', //custom text color 
	'boxShadow' : '', //to add box shadow 
	'textShadow' : '', //to add text shadow 
	}), 

});
</pre>

## Author 
Asif Mughal <br>
URL: www.codehim.com
