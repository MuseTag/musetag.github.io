---
title: Cheat Sheet
layout: cheatsheet
---

<table>
    <caption>Entities</caption>
    <tr><th>Description</th><th>Syntax</th></tr>
    <tr><td>Visible</td><td><code>@@Entity</code></td></tr>
    <tr><td>Hidden</td><td><code>@@(Entity)</code></td></tr>
    <tr><td>The <em>Null</em> one</td><td><code>@@.</code></td></tr>
    <tr><td>Declare once, use freely</td><td><code>@@Entity</code> (declare once; all further uses of the name are tracked automatically)</td></tr>
    <tr><td>Entity hierarchy</td><td><code>@@Entity</code> (main), <code>@@@Entity</code> (secondary), <code>@@@@Entity</code> (minor)</td></tr>
    <tr><td colspan="2"><em>Once an entity is declared as secondary or minor, it keeps that status everywhere in the text—even if referenced later with fewer <code>@</code>.</em></td></tr>
    <tr><td>Simple local note</td><td><code>@@Entity(note)</code></td></tr>
    <tr><td>Simple global note</td><td><code>@@Entity_(note)</code></td></tr>
</table>

<table>
    <caption>Modifiers</caption>
    <tr><th>Description</th><th>Syntax</th></tr>
    <tr><td>Local</td><td><code>@@Entity.modifier</code></td></tr>
    <tr><td>Global</td><td><code>@@Entity.MODIFIER</code></td></tr>
    <tr><td>With visible parameter</td><td><code>@@Entity.modifier[parameter]</code></td></tr>
    <tr><td>With hidden parameter</td><td><code>@@Entity.modifier(parameter)</code></td></tr>
    <tr><td>With both parameters</td><td><code>@@Entity.modifier[visible](hidden)</code></td></tr>
</table>

<table>
    <caption>Standard modifiers</caption>
    <tr><th>Description</th><th>Syntax</th></tr>
    <tr><td>Type of entity</td><td><code>@@Entity.Type(character)</code></td></tr>
    <tr><td>Point of view</td><td><code>@@Entity.Pov</code></td></tr>
    <tr><td>Alias (alternative name)</td><td><code>@@(Entity).Alias[AliasName]</code></td></tr>
    <tr><td>Hierarchical relation (child/member/part of)</td><td><code>@@Entity.ChildOf(@@Other)</code></td></tr>
    <tr><td>Hierarchical relation (parent/container/group of)</td><td><code>@@Entity.ParentOf(@@Other)</code></td></tr>
    <tr><td>Alias: part of</td><td><code>@@Entity.PartOf(@@Other)</code></td></tr>
    <tr><td>Alias: has part</td><td><code>@@Entity.HasPart(@@Other)</code></td></tr>
    <tr><td>Alias: belongs to</td><td><code>@@Entity.BelongsTo(@@Other)</code></td></tr>
    <tr><td>Alias: includes</td><td><code>@@Entity.Includes(@@Other)</code></td></tr>
    <tr><td>Alias: member of</td><td><code>@@Entity.MemberOf(@@Other)</code></td></tr>
    <tr><td>Alias: group of</td><td><code>@@Entity.GroupOf(@@Other)</code></td></tr>
    <tr><td>Alias: contained in</td><td><code>@@Entity.ContainedIn(@@Other)</code></td></tr>
    <tr><td>Alias: container of</td><td><code>@@Entity.ContainerOf(@@Other)</code></td></tr>
    <tr><td>Alias: descendant of</td><td><code>@@Entity.DescendantOf(@@Other)</code></td></tr>
    <tr><td>Alias: ancestor of</td><td><code>@@Entity.AncestorOf(@@Other)</code></td></tr>
    <tr><td>Remember something to do</td><td><code>@@.Todo(What to do)</code></td></tr>
    <tr><td>Version of document or section</td><td><code>@@.Version(Number)</code></td></tr>
    <tr><td>Status of document or section</td><td><code>@@.Status(StatusName)</code></td></tr>
    <tr><td>Geographic coordinates</td><td><code>@@Entity.Geo(latitude, longitude)</code></td></tr>
    <tr><td>Invisible entity</td><td><code>@@Entity.Hidden</code></td></tr>
    <tr><td>Correction (fix)</td><td><code>@@Entity.Fix[original](correction)</code></td></tr>
    <tr><td>Suggestion</td><td><code>@@Entity.Suggest[original](suggestion)</code></td></tr>
    <tr><td>Comment</td><td><code>@@Entity.Comment[fragment](comment)</code></td></tr>
    <tr><td colspan="2"><em>Global modifiers are cumulative: each occurrence adds information to the entity, unless explicitly defined as unique (e.g. <code>.Status</code>).</em></td></tr>
</table>

<table>
    <caption>Shorthands for standard modifiers</caption>
    <tr><th>Shorthand</th><th>for</th></tr>
    <tr><td><code>@@Entity.Place</code></td><td><code>@@Entity.Type(place)</code></td></tr>
    <tr><td><code>@@Entity.Object</code></td><td><code>@@Entity.Type(object)</code></td></tr>
    <tr><td><code>@@Entity.Event</code></td><td><code>@@Entity.Type(event)</code></td></tr>
    <tr><td><code>@@.Draft</code></td><td><code>@@.Status(draft)</code></td></tr>
    <tr><td><code>@@.Final</code></td><td><code>@@.Status(final)</code></td></tr>
</table>

<table>
    <caption>Markdown Sub-Cheat Sheet</caption>
    <tr><th>Description</th><th>Syntax</th></tr>
    <tr><td>Level 1</td><td><code># Title</code></td></tr>
    <tr><td>Level 2</td><td><code>## Title</code></td></tr>
    <tr><td>Level 3</td><td><code>### Title</code></td></tr>
    <tr><td>Level 4</td><td><code>#### Title</code></td></tr>
    <tr><td>Level 5</td><td><code>##### Title</code></td></tr>
    <tr><td>Level 6</td><td><code>###### Title</code></td></tr>
    <tr><td>Italic</td><td><code>_text_</code></td></tr>
    <tr><td>Bold</td><td><code>**text**</code></td></tr>
    <tr><td>Link</td><td><code>[Text](url)</code></td></tr>
    <tr><td>Picture</td><td><code>![Alternative text](image_url "Image title")</code></td></tr>
    <tr><td>Ordered list</td><td><code>1. First item</code></td></tr>
    <tr><td>Unordered list</td><td><code>-  item</code></td></tr>
    <tr><td>Citation</td><td><code>> Citation text</code></td></tr>
</table>

<table>
    <caption>Hidden Titles</caption>
    <tr><th>Description</th><th>Syntax</th></tr>
    <tr><td>Hidden Level 1</td><td><code>@@.(# Title)</code></td></tr>
    <tr><td>Hidden Level 2</td><td><code>@@.(## Title)</code></td></tr>
    <tr><td>Hidden Level 3</td><td><code>@@.(### Title)</code></td></tr>
    <tr><td>Hidden Level 4</td><td><code>@@.(#### Title)</code></td></tr>
    <tr><td>Hidden Level 5</td><td><code>@@.(##### Title)</code></td></tr>
    <tr><td>Hidden Level 6</td><td><code>@@.(###### Title)</code></td></tr>
</table>

<table>
    <caption>Temporal Entities</caption>
    <tr><th>Description</th><th>Syntax</th></tr>
    <tr><td>Date</td><td><code>@@(2025-12-28)</code></td></tr>
    <tr><td>Time</td><td><code>@@(14:00)</code></td></tr>
    <tr><td>Date and time</td><td><code>@@(2025-12-28_14:00)</code></td></tr>
    <tr><th colspan="2">You may use <em>abtract</em> datation, relative to a year "one" in your story, ignoring traditional calendar.</th></tr>
    <tr><td>Year 1</td><td><code>@@(@Y1)</code></td></tr>
    <tr><td>Year 1, month 3, day 12</td><td><code>@@(@Y1-M3-D12_14:30)</code></td></tr>
    <tr><th colspan="2">Or you can even use <em>an alternative calendar of your own</em> by appendng a slash <code>/</code> and a code (usually, three capital letters) to the entity name.</th></tr>
    <tr><td>The 42th day<br>of the 13th month<br>of the year 3027<br>of the Galatic Standard Time </td><td><code>@@(3027-13-42/GST)</code></td></tr>
</table>
