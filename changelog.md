# Cogboard changelog

## [0.54.0-SNAPSHOT] - 2019-12-12
### What's new

**Feature/clan6 210 re design widgets so they are more compact**


https://github.com/Cognifide/cogboard/pull/152


**Functional tests - cypress**
 - remove functional test inherited from knotx starter-kit
 - add functional tests in cypress to gradle tasks
 - add dependency for release task to funcitonalTests
 - refactor in travis

https://github.com/Cognifide/cogboard/pull/147


**fixed image tagging**


https://github.com/Cognifide/cogboard/pull/141


**Cypress - Config per env in travis**


https://github.com/Cognifide/cogboard/pull/128


**Add prettier**
Add prettier configuration to help with and force the consistent code formatting.

https://github.com/Cognifide/cogboard/issues/88


**Widget | Image**
I want to have possibility to put image into tile (project logo etc)

**AC**
- [ ] Admin can upload his own image 
- [ ] Upload have restrictions (front and backend validations), only jpg, jpeg, png, gif, x<5MB
- [ ] Uploaded image is automatically adjuste to widget size without affecting its ratio (only scale change)
- [ ] Admin can choose image from pre-uploaded images
- [ ] Admin can remove image from library (confirmation popup)
- [ ] Files should be saved in mnt/assets directory
- [ ] User should see image on whole tile size (if no title entered)


https://github.com/Cognifide/cogboard/issues/84


**Widget | Todo List**
I want to have kind of project checklist.

**AC**
- [ ] Admin can set title
- [ ] Admin can add/edit/remove checklist items
- [ ] Admin can reorder checklist items
- [ ] Admin can clear resolved items (button, then confirmation popup)
- [ ] User can see checklist 
- [ ] User can mark items on list as resolved / unresolved by clicking checkbox
- [ ] Item marked as a resolved will put at the bottom of list (should be styled as striked out)
- [ ] Item unmarked from resolved to unresolved should back to its previous position (according to ordering)
- [ ] ToDo list status should be saved automatically (without clicking save button)


  



https://github.com/Cognifide/cogboard/issues/83


**Feature | Iframe dashboard**
I want to have possibility to set whole dashboard as an one big Iframe (eg. grafana).

**AC**
- [ ] When adding new dashboard, Admin can choose additional Dashboard Type - Iframe Dashnboard
- [ ] Iframe Dashboard type should have field URL set as required (add front and backend validations)
- [ ] Dashboard with Iframe type shouldn't have possibility to add new widgets (still need possibility to save it)
- [ ] User should see full screen iframe as a selected dashboard (top menu bar with login/logout, dashboard picker and dashboard rotator should be still visible).


https://github.com/Cognifide/cogboard/issues/82


**Widget | Timeline**
Widget should allow us to have better visibility on project timeline, meetings etc.

We want to add new widget:
- [ ] Admin can add event with date
- [ ] Admin can edit and remove events
- [ ] Admin can set how much days overdue and days away should be visible on widget
- [ ] Admin can set repeatable evens (periodically - repeat every x days)
- [ ] User should see list of dates & events from selected range (days overdue and days away)
- [ ] List mentioned above should have section for days overdue (gray background), current day (maybe bold font), and future events (normal font)
- [ ] Admin can set event cathegory and styling eg. red colour for deadlines, blue for holidays, and assign cathegory to specific event
- [ ] Event should have assigned cathegory colour on list


https://github.com/Cognifide/cogboard/issues/81


**Standalone component for notifications**
Every app notification should be pushed to the store and displayed by view. Component should be decoupled from any other UI component like UserLogin.

https://github.com/Cognifide/cogboard/issues/73


**Widget | AEM logs tracking**
 it would be nice if feature of  https://github.com/Cognifide/gradle-aem-plugin#task-instancetail
 / standalone tailer https://github.com/Cognifide/gradle-aem-plugin/tree/master/dists/gradle-aem-tailer will be reflected in CogBoard

I am convinced that implementation could be done purely in JS

features to reflect:

- parsing AEM endpoint which outputs log entries (keep in mind that this endpoint could respond same log entries, so that JS parsing based on timestamp is needed to avoid analyzing duplicates)
- incident reporting when cannonade of unknown errors occurred (after deploying CRX package with defect to be able to inform user who performed deploy about his mistake)
- filtering errors / to avoid reporting errors already known (not problematic,mitigated)
- threshold of error count in case of time - colour of card on the board could  be red if e.g limit of more than 10 errors per minute will be exceeded


https://github.com/Cognifide/cogboard/issues/55


**Use `io.knotx.distribution` Gradle plugin**
**Is your feature request related to a problem? Please describe.**

Knot.x Distribution Gradle plugin (`io.knotx.distribution`) allows to easily download Knot.x distribution (Knot.x Stack) with all dependencies and integrate them with custom modules.

**Describe the solution you'd like**
Use the `io.knotx.distribution` plugin instead of `gradle/distribution.gradle.kts`. Please check [Knot.x Starter Kit](https://github.com/Knotx/knotx-starter-kit) as a reference.

Please check lines:
```
tasks.register("prepareDocker") {
    dependsOn("cleanDistribution", "overwriteCustomFiles", "copyDockerfile")
}
```

**Additional context**
Improvements can be added with next versions of the plugin.


https://github.com/Cognifide/cogboard/issues/43

