require 'find'
require 'script/plugin'
require 'script/generate'
require 'hpricot'

namespace :extmvc do
  
  namespace :build do
    
    desc "Builds concatenated/minified javascript and css files of all local assets"
    task :all do
      Rake::Task["extmvc:build:concatenate_js"].execute
      Rake::Task["extmvc:build:concatenate_css"].execute
      Rake::Task["extmvc:build:minify_js"].execute
      # Rake::Task["extmvc:build:minify_css"].execute
    end
    
    task :concatenate_js do
      puts; puts "Concatenating Javascript files"
      
      files = []
      html_filename = ENV['file'] || "index.html"
      
      #find all script files in the html file.  Ignore any with a class 'concat-ignore'
      doc = Hpricot(open(html_filename))
      (doc/"script[@class!='concat-ignore']").each {|s| files.push(s['src']) if s['src']}
    
      concatenate_files(files, "public/application-all.js")
    end
    
    task :concatenate_css do
      puts "Concatenating CSS files"
      
      files = []
      html_filename = ENV['file'] || "index.html"
      
      #find all script files in the html file.  Ignore any with a class 'concat-ignore'
      doc = Hpricot(open(html_filename))
      (doc/"link[@re!='stylesheet']").each {|s| files.push(s['href']) if s['href'] && !s['href'].match(/http(.*)/)}
    
      concatenate_files(files, "public/stylesheets/application-all.css")
    end
    
    task :minify_js do
      puts "Minifying Javascript files"
      
      concatenated_filename = "public/application-all.js"
      minified_filename     = "public/application-all-min.js"
      
      FileUtils.rm(minified_filename) and puts "Deleted old #{minified_filename}" if File.exists?(minified_filename)
      
      system("java -jar script/yui-compressor/build/yuicompressor-2.4.jar #{concatenated_filename} -o #{minified_filename}")
      
      puts "Created minified file #{minified_filename}"; puts
    end
    
    task :minify_css do
      puts "Minifying CSS files"
    end
    
    def concatenate_files(files, concatenated_filename)
      #remove old files, create blank ones again
      File.delete(concatenated_filename) and puts "Deleted old #{concatenated_filename}" if File.exists?(concatenated_filename)
      FileUtils.touch(concatenated_filename)
      
      count = 0
      file = File.open(concatenated_filename, 'w') do |f|
        files.each do |i|
          # remove the directory the app is in if add_dir is supplied
          i = i.gsub(Regexp.new(ENV['app_dir']), '').gsub(/$(\/*)(.*)/, '\2') if ENV['app_dir']

          f.puts(IO.read(i))
          f.puts("\n")
          count += 1
        end
      end
      
      puts "Concatenated #{count} files into #{concatenated_filename}"; puts
    end
  end
  
  namespace :generate do
    task :model do
      fields = ENV['fields'].split(",").collect {|f| f.split(":")}
      ExtMVC::Generators::Model.new(ENV['name'], fields).generate!
    end
    
    task :controller do
      
    end
    
    task :view do
      
    end
  end
  
  namespace :plugin do
    
    desc "Takes 1 argument - the name of a dir inside plugins, or the name of a github repository url"
    task :install do
      dir = ENV['dir']
      Rake::Task["extmvc:plugin:install_assets"].execute
    end
    
    desc "Copies everything from the plugin's public folder into the main public folder"
    task :install_assets do
      ExtMVC::Plugin.new(ENV['git'] || ENV['dir']).install_assets
    end
    
    task :install_script_tags do
    
    end
    
    desc "Takes 1 argument - directory name.  Uninstalls everything from under public and removes include tags on indexdev.html.  Also deletes plugin dir"
    task :uninstall do
      Rake::Task["extmvc:plugin:uninstall_assets"].execute
      Rake::Task["extmvc:plugin:uninstall_script_tags"].execute
      Rake::Task["extmvc:plugin:delete_plugin"].execute
    end
    
    desc "Looks at files within vendor/plugins/PluginName/public, removes any of those files in the site's main public directory"
    task :uninstall_assets do
      ExtMVC::Plugin.new(ENV['git'] || ENV['dir']).uninstall_assets
    end
    
    task :uninstall_script_tags do
      
    end
    
    task :delete_plugin do
      
    end
  end
  
end