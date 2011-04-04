 <div id="studio_popup">
    <div id="studio_popup_primary">
      <div id="popup_content">
        <h2>Welcome to AppFlower Studio</h2>
        <p>There is going to be some description tetxt in this area. There is going to be some description tetxt in this area.</p>
        <a href="">Start</a>
      </div>
    </div>
    <div id="studio_popup_secondary">
     <div id="studio_video_tours">
      <h3>Video Tours</h3>
      <ul>
        
          	<?php foreach ($data as $video): ?>
            <li>
              <a href="<?php echo $video['url']?>" rel="prettyPhoto"> <img src="<?php echo $video['thumbnail_small']?>" /> </a>
              <div>
                <p class="views"><span><?php echo $video['stats_number_of_plays']?> views</span></p>
                <h5><?php echo substr( $video['title'], 0, 20 ) ?></h5>
                <span><?php echo substr($video['description'], 0, 25)?></span>
              </div>
            </li>
            <?php endforeach; ?>
            
     </ul>
    </div>
    <div id="quick_links">
      <h3>Quick links</h3>
      <ul>
        <li><a href="">Create new project</a></li>
        <li><a href="">Open existing project</a></li>
        <li><a href="">Open discussion forum</a></li>
        <li><a href="">Go to learning center</a></li>
      </ul>
    </div>
    </div>
  </div>